import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table';
import { Guid } from 'guid-typescript';
import { Order } from '../../../models/order.model';
import { EmployeeService } from '../../../services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-orders',
  templateUrl: './employee-orders.component.html',
  styleUrls: ['./employee-orders.component.css']
})
export class EmployeeOrdersComponent implements OnInit, AfterViewInit {

  public dataSourceInProcess = new MatTableDataSource<Order>();
  ordersInProcess: Order[];
  public dataSourceCompleted = new MatTableDataSource<Order>();
  ordersCompleted: Order[];
  displayedColumns = ['employee', 'customer', 'status', 'priority', 'numberItems', 'totalPrice', 'detail'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private router: Router, private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getEmployeeById();
  }

  getEmployeeById(): void {
    let id = this.activatedRoute.snapshot.paramMap.get("id");

    this.employeeService.getEmployeesById(id)
      .subscribe((data: any) => {
        this.dataSourceCompleted = data.employee.ordersCompleted;
        this.dataSourceInProcess = data.employee.ordersInProcess;
      })
  }

  redirectToDetails(id: Guid): void {
    let url: string = `/order/details/${id}`;
    this.router.navigate([url]);
  }

  ngAfterViewInit(): void {
    this.dataSourceInProcess.sort = this.sort;
    this.dataSourceCompleted.sort = this.sort;
    this.dataSourceInProcess.paginator = this.paginator;
    this.dataSourceCompleted.paginator = this.paginator;
  }

  public doFilterInProcess = (value: string) => {
    this.dataSourceInProcess.filter = value.trim().toLocaleLowerCase();
  }

  
  public doFilterCompleted = (value: string) => {
    this.dataSourceCompleted.filter = value.trim().toLocaleLowerCase();
  }
}
