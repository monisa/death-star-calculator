import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PersonListService {
  constructor(private http: HttpClient) {}

  private url: string = 'https://swapi.dev/api';
  public previousCalculation: Array<any> = [];

  getPersons(name: string): Observable<any> {
    return this.http.get(`${this.url}/people/?search=${name}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(
          `Error retrieving travellers data. ${error.statusText || 'Unknown'} `
        );
      })
    );
  }

  getPlanet(url: string): Observable<any> {
    return this.http.get(`${url}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(
          `Error retrieving travellers data. ${error.statusText || 'Unknown'} `
        );
      })
    );
  }

  setPreviousCalculation(selectedPlanetData: any, total: any) {
    const peopleMapping = selectedPlanetData.people.map((data: any) => {
      return data.name;
    });

    this.previousCalculation.push({
      person: peopleMapping.toString(),
      volume: total,
    });
  }

  getPreviousCalculation() {
    return this.previousCalculation;
  }
}
