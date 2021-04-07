import { Injectable } from '@angular/core';
import { Address } from '../models/address.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Guid } from 'guid-typescript';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application-json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AddressService {

  private url: string = 'https://localhost:44334/api/addresses';

  constructor(private http: HttpClient) { }

  getAddresses(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  getAddressById(id: string): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.get<any>(url);
  }

  getAddressesByIdPerson(id: string): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.get<any>(url)
  }

  addAddress(address: Address): Observable<Guid> {
    return this.http.post<Guid>(this.url, address, httpOptions);
  }

  updateAddress(id: string, address: Address): Observable<Address> {
    return this.http.put<Address>(`${this.url}/${id}`, address, httpOptions);
  }

  deleteAddress(id: string): Observable<Address> {
    return this.http.delete<Address>(`${this.url}/${ id }`, httpOptions);
  }
}
