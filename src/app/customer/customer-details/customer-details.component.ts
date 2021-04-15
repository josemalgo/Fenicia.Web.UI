import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  
  public customerForm: FormGroup;

  constructor(
    private customerService: CustomerService,
    private location: Location,
    private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
      this.getEmployee();
      this.customerForm = new FormGroup({
        tradeName: new FormControl(),
        fiscalName: new FormControl(),
        nif: new FormControl(),
        email: new FormControl(),
        phone: new FormControl(),
      });
      this.customerForm.disable();
    }
  
    getEmployee(): void {
      let id = this.route.snapshot.paramMap.get("id");
      if (id == null) {
        return;
      }
      else{
        this.customerService.getCustomersById(id)
          .subscribe((data: any) =>
            this.customerForm.setValue({
              tradeName: data.customer.tradeName, 
              fiscalName: data.customer.fiscalName,
              nif: data.customer.nif,
              email: data.customer.email,
              phone: data.customer.phone,
          }));
      }
    }
  
    back(): void {
      this.location.back();
    }
}
