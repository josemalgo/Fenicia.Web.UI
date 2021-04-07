import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Guid } from 'guid-typescript';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, AfterViewInit {

  customer: Customer;
  public dataSource = new MatTableDataSource<Customer>();
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns = ['email', 'tradeName', 'fiscalName', 'nif', 'phone', 
    'detail', 'update', 'delete']; 

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.fillCustomerTable();
  }

  fillCustomerTable(): void {
    this.customerService.getCustomers()
      .subscribe((data: any) => this.dataSource.data = data.customers)
  }

  redirectToDetails(id: Guid): void {
    let url: string = `/customer/details/${id}`;
    this.router.navigate([url]);
  }

  redirectToUpdate(id: Guid): void {
  }

  redirectToDelete(id: Guid): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
