import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table';
import { Guid } from 'guid-typescript';
import { Order } from '../../../models/order.model';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-orders',
  templateUrl: './employee-orders.component.html',
  styleUrls: ['./employee-orders.component.css']
})
export class EmployeeOrdersComponent implements OnInit {

  public dataSource = new MatTableDataSource<Order>(); 

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns = ['dni', 'name', 'surname', 'email', 'job', 'phone', 
    'detail', 'update', 'delete'];

  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit(): void {
  }

  redirectToDetails(id: Guid): void {
    let url: string = `/order/details/${id}`;
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
