import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table';
import { Guid } from 'guid-typescript';
import { Product } from '../../models/products/product.model';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  product: Product;
  public dataSource = new MatTableDataSource<Product>(); 

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns = ['name', 'price', 'iva', 'description', 'stock', 
    'detail', 'update', 'delete'];

  constructor(private productService: ProductService, private router: Router) {

  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe((data: any) => this.dataSource.data = data.products);
  }

  redirectToDetails(id: Guid): void {
    let url: string = `/product/details/${id}`;
    this.router.navigate([url]);
  }

  redirectToUpdate(id: Guid): void {
    let url: string = `/product/update/${id}`;
    this.router.navigate([url]);
  }

  redirectToDelete(id: Guid): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
