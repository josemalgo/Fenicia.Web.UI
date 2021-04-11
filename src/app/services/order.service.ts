import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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
export class OrderService {

  private url: string = 'https://localhost:44334/api/orders';

  constructor(private http: HttpClient) { }

  getOrders() : Observable<any> {
    return this.http.get<any>(this.url);
  }

  getOrderById(id: string): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.get<any>(url);
  }

  addOrder(employee: Order): Observable<Guid> {
    return this.http.post<Guid>(this.url, employee, httpOptions);
  }

  updateOrder(id: string, employee: any): Observable<Guid> {
    return this.http.put<Guid>(`${this.url}/${id}`, employee, httpOptions);
  }

  deleteOrder(id: string): Observable<Guid> {
    return this.http.delete<Guid>(`${this.url}/${ id }`, httpOptions);
  }
}
