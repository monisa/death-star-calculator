import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, firstValueFrom, map, switchMap } from 'rxjs';
import { Person } from 'src/app/interfaces/person.interface';
import { PersonListService } from 'src/app/services/person-list.service';

@Component({
  selector: 'app-volume-calculator',
  templateUrl: './volume-calculator.component.html',
  styleUrls: ['./volume-calculator.component.scss'],
})
export class VolumeCalculatorComponent {
  public myControl: FormControl = new FormControl();
  public options: Person[] = [];
  public enemyList: Array<any> = new Array<any>();
  public filteredOptions: Array<Person> = [];
  public noData: boolean = false;
  public planetData: any;
  public selectedPlanetData: any = {
    totalVolume: [],
    people: [],
  };
  public grantTotal = 0;
  constructor(
    private personService: PersonListService,
    private http: HttpClient,
    private route: Router
  ) {}

  ngOnInit() {
    this.myControl.valueChanges
      .pipe(
        switchMap((v) => this.personService.getPersons(v)),
        map((data) => data.results)
      )
      .subscribe((personList) => {
        this.filteredOptions = personList;
        this.noData = personList.length > 0 ? false : true;
      });
  }

  public optionClicked(event: Event, user: Person) {
    event.stopPropagation();
    this.toggleSelection(user);
  }

  public toggleSelection(user: Person) {
    user.selected = !user.selected;
    if (user.selected) {
      this.enemyList.push(user);
    } else {
      const i = this.enemyList.findIndex((value) => value.name === user.name);
      this.enemyList.splice(i, 1);
    }
    // this.myControl.setValue(this.enemyList);
  }

  public displayFn(): string {
    return '';
  }

  public async calculation(): Promise<void> {
    this.selectedPlanetData.totalVolume = [];
    this.selectedPlanetData.people = [];
    const tempDiameter: any = [];
    for (const enemy of this.enemyList) {
      try {
        const planetData = await firstValueFrom(
          this.getPlanetData(enemy.homeworld)
        );
        this.selectedPlanetData.people.push(enemy);

        if (!tempDiameter.includes(planetData.diameter)) {
          tempDiameter.push(planetData.diameter);
          const radius = Math.floor(planetData.diameter / 2);
          this.getVolume(radius);
          this.grantTotal = this.selectedPlanetData.totalVolume.reduce(
            (partialSum: number, a: number) => partialSum + a,
            0
          );
        }
        console.log(this.selectedPlanetData);
      } catch (error) {
        console.error(error);
      }
    }
  }

  public getVolume(radius: any) {
    const volume: number = Math.floor((4 / 3) * Math.PI * Math.pow(radius, 3));

    this.selectedPlanetData.totalVolume.push(Number.isNaN(volume) ? 0 : volume);
    return Number.isNaN(volume) ? 0 : volume;
  }

  public getPlanetData(url: string): Observable<any> {
    return this.http.get(`${url}`);
  }

  public goPreviousCalculation() {
    this.personService.setPreviousCalculation(
      this.selectedPlanetData,
      this.grantTotal
    );
    this.route.navigate(['/']);
  }
}
