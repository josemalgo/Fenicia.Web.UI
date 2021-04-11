import { Component, OnInit } from '@angular/core';
import { CustomerUpdate } from '../../models/customers/customerUpdate.model';
import { CustomerService } from '../../services/customer.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Address } from '../../models/address.model';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {

  public customerForm: FormGroup;
  public dataSource = new MatTableDataSource<Address>();
  displayedColumns = ['description', 'zipCode', 'city', 'country', 'update', 'delete'];

  constructor(private customerService: CustomerService, private location: Location,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getCustomerById();
    this.customerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.maxLength(60), Validators.email]),
      tradeName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      fiscalName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      nif: new FormControl('', [Validators.required, Validators.maxLength(9)]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(9)])
    });
  }

  getCustomerById(): void {
    let id = this.route.snapshot.paramMap.get("id");
    if (id == null) {
      return;
    }
    else{
    this.customerService.getCustomersById(id)
      .subscribe((data: any) => {
        this.dataSource.data = data.customer.addresses
        this.customerForm.setValue({
          email: data.customer.email,
          tradeName: data.customer.tradeName,
          fiscalName: data.customer.fiscalName,
          nif: data.customer.nif,
          phone: data.customer.phone
        })
      });
    }
  }

  updateCustomer(customerFormValue): void {
    if(this.customerForm.valid){
      this.executionCustomerUpdation(customerFormValue);
    }
  }

  private executionCustomerUpdation = (customerFormValue) => {
    let id = this.route.snapshot.paramMap.get("id");

    let customer: CustomerUpdate = {
      id: id,
      email: customerFormValue.email,
      tradeName: customerFormValue.tradeName,
      fiscalName: customerFormValue.fiscalName,
      nif: customerFormValue.nif,
      phone: customerFormValue.phone
    }

    this.customerService.updateCustomer(id, customer)
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

  public hasError = (controlName: string, errorName: string) => {
    return this.customerForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

}
