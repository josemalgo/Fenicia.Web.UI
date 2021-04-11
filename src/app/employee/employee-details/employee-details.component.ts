import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
    });
    this.employeeForm.disable();
  }

  getEmployee(): void {
    let id = this.route.snapshot.paramMap.get("id");
    if (id == null) {
      return;
    }
    else{
      this.employeeService.getEmployeesById(id)
        .subscribe((data: any) =>
          this.employeeForm.setValue({
            email: data.employee.user.email, 
            dni: data.employee.dni,
            name: data.employee.name,
            surname: data.employee.surname,
            phone: data.employee.phone,
            job: data.employee.phone,
        }));
    }
  }

  back(): void {
    this.location.back();
  }

}
