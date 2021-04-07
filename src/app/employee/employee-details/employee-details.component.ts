import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Employee } from '../../models/employee.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  public employee: any;
  public employeeForm: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private location: Location,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getEmployee();
    this.employeeForm = new FormGroup({
      email: new FormControl(),
      dni: new FormControl(),
      name: new FormControl(),
      surname: new FormControl(),
      phone: new FormControl(),
      job: new FormControl(),
      description: new FormControl(),
      zipCode: new FormControl(),
      city: new FormControl(),
    });
  }

  getEmployee(): void {
    let id = this.route.snapshot.paramMap.get("id");
    if (id == null) {
      return;
    }
    else{
      this.employeeService.getEmployeesById(id)
        .subscribe((data: any) => this.employee = data.employee);
    }
  }

  back(): void {
    this.location.back();
  }


}
