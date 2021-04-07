import { EmployeeService } from '../../services/employee.service';
import { AddressService } from '../../services/address.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Employee } from '../../models/employee.model';
import { Guid } from 'guid-typescript';
import { Address } from '../../models/address.model';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
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

  public displayedColumns = ['id', 'description', 'zipCode', 'city', 'country',
    'detail', 'update', 'delete'];

  constructor(private employeeService: EmployeeService, private location: Location,
    private router: Router, private addressService: AddressService) { }

  ngOnInit(): void {
    this.fillTableAddress();
    this.employeeForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.maxLength(60), Validators.email]),
      password: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dni: new FormControl('', [Validators.required, Validators.maxLength(9)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      surname: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(9)]),
      job: new FormControl('', [Validators.required, Validators.maxLength(60)]),
    });
  }

  private fillTableAddress(){
    this.addressService.getAddressesByIdPerson()
      .subscribe((data: any) => this.dataSource.data = data.addresses);
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
    
    // let user: User = {
    //   id: Guid.EMPTY,
    //   email: employeeFormValue.email,
    //   password: employeeFormValue.password
    // }

    // let address: Address = {
    //   id: Guid.EMPTY,
    //   description: employeeFormValue.description,
    //   zipCode: employeeFormValue.zipCode,
    //   city: employeeFormValue.city,
    //   countryId: employeeFormValue.countryId
    // }

    // let employee: Employee = {
    //   id: Guid.EMPTY,
    //   dni: employeeFormValue.dni,
    //   name: employeeFormValue.name,
    //   surname: employeeFormValue.surname,
    //   phone: employeeFormValue.phone,
    //   isAdmin: employeeFormValue.isAdmin,
    //   job: employeeFormValue.job,
    //   salary: employeeFormValue.salary,
    //   address: address,
    //   user: user
    // }
 
    // this.employeeService.addEmployee(employee)
    //   .subscribe(res => {
    //     //this is temporary, until we create our dialogs
    //     this.location.back();
    //   },
    //   (error => {
    //     //temporary as well
    //     this.location.back();
    //   })
    // )
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
