import { EmployeeService } from '../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Employee } from '../../models/employee.model';
import { Guid } from 'guid-typescript';
import { Address } from '../../models/address.model';
import { User } from '../../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {
  
  public isAdmin: boolean = false;
  hide = true;
  public employeeForm: FormGroup;
  public dataSource = new MatTableDataSource<Address>(); 
  private userId: string;

  public displayedColumns = ['id', 'description', 'zipCode', 'city', 'country',
    'detail', 'update', 'delete'];

  constructor(private employeeService: EmployeeService, private location: Location,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getEmployeeById();
    this.employeeForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.maxLength(60), Validators.email]),
      password: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dni: new FormControl('', [Validators.required, Validators.maxLength(9)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      surname: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(9)]),
      job: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      salary: new FormControl('', [Validators.required]),
    });
  }

  private getEmployeeById(){
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id == null) {
      return;
    }
    else{
    this.employeeService.getEmployeesById(id)
      .subscribe((data: any) => {
        this.dataSource.data = data.employee.addresses;
        this.employeeForm.setValue({
          email: data.employee.email, 
          password: data.employee.password,
          dni: data.employee.dni,
          name: data.employee.name,
          surname: data.employee.surname,
          phone: data.employee.phone,
          job: data.employee.job,
          salary: data.employee.salary
        });
        this.userId = data.employee.userId;
        this.isAdmin = data.employee.isAdmin;
      });  
    }
  }
  
  public hasError = (controlName: string, errorName: string) => {
    return this.employeeForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public editEmployee = (employeeFormValue) => {
    if (this.employeeForm.valid) {
      this.executeEmployeeEdit(employeeFormValue);
    }
  }

  private executeEmployeeEdit = (employeeFormValue) => {
    let user: User = {
      id: this.userId,
      email: employeeFormValue.email,
      password: employeeFormValue.password
    };

    type EmployeeUpdate = Omit<Employee, "address">;
    let employee: EmployeeUpdate = {
      id: this.activatedRoute.snapshot.paramMap.get('id'),
      user: user,
      dni: employeeFormValue.dni,
      name: employeeFormValue.name,
      surname: employeeFormValue.surname,
      phone: employeeFormValue.phone,
      job: employeeFormValue.job,
      isAdmin: this.isAdmin,
      salary: employeeFormValue.salary
    }

    this.employeeService.updateEmployee(employee.id, employee)
      .subscribe(res => {
        //this is temporary, until we create our dialogs
        this.location.back();
      },
      (error => {
        //temporary as well
        this.location.back();
      })
    )
  }

  redirectToDetails(id: Guid): void {
    let url: string = `/address/details/${id}`;
    this.router.navigate([url]);
  }

  redirectToUpdate(id: Guid): void {
  }

  redirectToDelete(id: Guid): void {
  }

  public checkChanged = (event) => {
    this.isAdmin = event.checked;
  }

}
