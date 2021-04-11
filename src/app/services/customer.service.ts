import { Injectable } from '@angular/core';
import { Customer } from '../models/customers/customer.model';
import { CustomerUpdate } from '../models/customers/customerUpdate.model';
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

export class CustomerService {

  private url: string = 'https://localhost:44334/api/customers';

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  getCustomersById(id: string): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.get<any>(url);
  }

  addCustomer(customer: Customer): Observable<Guid> {
    return this.http.post<Guid>(this.url, customer, httpOptions);
  }

  updateCustomer(id: string, customer: CustomerUpdate): Observable<Customer> {
    return this.http.put<Customer>(`${this.url}/${id}`, customer, httpOptions);
  }

  deleteCustomer(id: string): Observable<Customer> {
    return this.http.delete<Customer>(`${this.url}/${ id }`, httpOptions);
  }
}
