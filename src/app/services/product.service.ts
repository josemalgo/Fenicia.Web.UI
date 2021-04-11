import { Injectable } from '@angular/core';
import { Product } from '../models/products/product.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Guid } from 'guid-typescript';
import { ProductUpdate } from '../models/products/productUpdate.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url: string = 'https://localhost:44334/api/products';

  constructor(private http: HttpClient) { }

  getProducts() : Observable<any> {
    return this.http.get<any>(this.url);
  }

  getProductById(id: string): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.get<any>(url);
  }

  addProduct(product: Product): Observable<Guid> {
    return this.http.post<Guid>(this.url, product, httpOptions);
  }

  updateProduct(id: string, product: ProductUpdate): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${id}`, product, httpOptions);
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.url}/${ id }`, httpOptions);
  }
}
