import { Component } from '@angular/core';
import { PersonListService } from 'src/app/services/person-list.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent {
  public displayedColumns: string[] = ['person', 'volume'];
  public previousCalculation: Array<any> = [];
  constructor(private personService: PersonListService) {}
  ngOnInit() {
    this.previousCalculation = this.personService.getPreviousCalculation();
  }
}
