import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table';
import { Guid } from 'guid-typescript';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit, AfterViewInit {

  employee: Employee;
  public dataSource = new MatTableDataSource<Employee>(); 

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns = ['dni', 'name', 'surname', 'email', 'job', 'phone', 
    'detail', 'update', 'delete'];

  constructor(private employeeService: EmployeeService, private router: Router) {

  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe((data: any) => this.dataSource.data = data.employees);
  }

  redirectToDetails(id: Guid): void {
    let url: string = `/employee/details/${id}`;
    this.router.navigate([url]);
  }

  redirectToUpdate(id: Guid): void {
    let url: string = `/employee/update/${id}`;
    this.router.navigate([url]);
  }

  redirectToDelete(id: Guid): void {
    let url: string = `/employee/delete/${id}`;
    this.router.navigate([url]);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
