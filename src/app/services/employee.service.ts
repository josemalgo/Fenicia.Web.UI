import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
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

export class EmployeeService {

  private url: string = 'https://localhost:44334/api/employees';

  constructor(private http: HttpClient) { }

  getEmployees() : Observable<any> {
    return this.http.get<any>(this.url);
  }

  getEmployeesById(id: string): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.get<any>(url);
  }

  addEmployee(employee: Employee): Observable<Guid> {
    return this.http.post<Guid>(this.url, employee, httpOptions);
  }

  updateEmployee(id: string, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.url}/${id}`, employee, httpOptions);
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this.http.delete<Employee>(`${this.url}/${ id }`, httpOptions);
  }
}
