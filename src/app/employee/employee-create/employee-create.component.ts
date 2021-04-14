import { EmployeeService } from '../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Employee } from '../../models/employee.model';
import { Guid } from 'guid-typescript';
import { Address } from '../../models/address.model';
import { User } from '../../models/user.model';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})

export class EmployeeCreateComponent implements OnInit {

  public isAdmin: boolean;
  hide = true;
  countries: any[];
  public employeeForm: FormGroup;
  
  constructor(private location: Location, 
    private employeeService: EmployeeService, 
    private countryService: CountryService) { }

  ngOnInit() {
    this.fillCountries();
    this.employeeForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.maxLength(60), Validators.email]),
      password: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dni: new FormControl('', [Validators.required, Validators.maxLength(9)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      surname: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(9)]),
      job: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      salary: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      zipCode: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      city: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      country: new FormControl('', [Validators.required]),
    });
  }

  fillCountries(): void {
    this.countryService.getCountries()
      .subscribe((data: any) => this.countries = data.countries);
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.employeeForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public createEmployee = (employeeFormValue) => {
    if (this.employeeForm.valid) {
      this.executeEmployeeCreation(employeeFormValue);
    }
  }

  private executeEmployeeCreation = (employeeFormValue) => {
    
    let user: User = {
      id: Guid.EMPTY,
      email: employeeFormValue.email,
      password: employeeFormValue.password
    }

    let address: Address = {
      id: Guid.EMPTY,
      description: employeeFormValue.description,
      zipCode: employeeFormValue.zipCode,
      city: employeeFormValue.city,
      countryId: employeeFormValue.country
    }

    let employee: Employee = {
      id: Guid.EMPTY,
      dni: employeeFormValue.dni,
      name: employeeFormValue.name,
      surname: employeeFormValue.surname,
      phone: employeeFormValue.phone,
      isAdmin: this.isAdmin,
      job: employeeFormValue.job,
      salary: employeeFormValue.salary,
      address: address,
      user: user
    }
 
    this.employeeService.addEmployee(employee)
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

  public OnChange($event):void {
    this.isAdmin = $event.checked;
  }
}