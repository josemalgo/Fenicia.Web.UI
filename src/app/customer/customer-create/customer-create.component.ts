import { CustomerService } from '../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Customer } from '../../models/customers/customer.model';
import { Address } from '../../models/address.model';
import { Guid } from 'guid-typescript';
import { CountryService } from '../../services/country.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  customer: Customer;
  countries: any[];
  public customerForm: FormGroup;

  constructor(private customerService: CustomerService, 
    private countryService: CountryService,
    private location: Location ) { }

  ngOnInit(): void {
    this.fillCountries();
    this.customerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.maxLength(60), Validators.email]),
      tradeName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      fiscalName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      nif: new FormControl('', [Validators.required, Validators.maxLength(9)]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(9)]),
      description: new FormControl('', [Validators.required]),
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
    return this.customerForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public createCustomer = (customerFormValue) => {
    if(this.customerForm.valid){
      this.executeCustomerCreation(customerFormValue);
    }
  }

  private executeCustomerCreation = (customerFormValue) => {
    
    let customer: Customer = {
      id: Guid.EMPTY,
      email: customerFormValue.email,
      tradeName: customerFormValue.tradeName,
      fiscalName: customerFormValue.fiscalName,
      nif: customerFormValue.nif,
      phone: customerFormValue.phone,
      address: {
        id: Guid.EMPTY,
        description: customerFormValue.description,
        zipCode: customerFormValue.zipCode,
        city: customerFormValue.city,
        countryId: customerFormValue.country
      }
    }

    this.customerService.addCustomer(customer)
      .subscribe(res => {
        this.location.back();
      })
  }
}
