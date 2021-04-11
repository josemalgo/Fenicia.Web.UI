import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Guid } from 'guid-typescript';
import { Customer } from '../../models/customers/customer.model';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CustomerDeleteComponent } from '../customer-delete/customer-delete.component';

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

  constructor(private customerService: CustomerService, private router: Router,
    public dialog: MatDialog) { }

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
    let url: string = `/customer/update/${id}`;
    this.router.navigate([url]);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  openDeleteDialog(id: string): void {
    const dialogRef = this.dialog.open(CustomerDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.customerService.deleteCustomer(id)
          .subscribe(() => {
            this.fillCustomerTable();
          });
      }
    })
  }

}
