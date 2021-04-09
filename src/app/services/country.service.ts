import { Injectable } from '@angular/core';
import { Country } from '../models/country.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private url: string = 'https://localhost:44334/api/countries';

  constructor(private http: HttpClient) { }

  getCountries() : Observable<any> {
    return this.http.get<any>(this.url);
  }

  getCountryById(id: string): Observable<Country> {
    const url = `${this.url}/${id}`;
    return this.http.get<Country>(url);
  }

}
