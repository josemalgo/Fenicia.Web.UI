import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Guid } from 'guid-typescript';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private url: string = 'https://localhost:44334/api/categories';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any>{
    return this.http.get<any>(this.url);
  }

  getCategoryById(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  addCategory(category: Category): Observable<Guid> {
    return this.http.post<Guid>(this.url, category, httpOptions)
  }

  updateCategory(id: string, category: Category): Observable<Guid> {
    return this.http.put<Guid>(`${this.url}/${id}`, category, httpOptions);
  }

  update(id: string): Observable<Guid> {
    return this.http.delete<Guid>(`${this.url}/${id}`, httpOptions)
  }

}
