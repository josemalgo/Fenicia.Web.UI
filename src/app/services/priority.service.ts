import { Injectable } from '@angular/core';
import { Priority } from '../models/priority.model';
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

export class PriorityService {

  private url: string = 'https://localhost:44334/api/priorities';

  constructor(private http: HttpClient) { }

  getPriority() : Observable<any> {
    return this.http.get<any>(this.url);
  }
}
