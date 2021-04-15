import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { CustomerRoutingModule } from './customer-routing/customer-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerUpdateComponent } from './customer-update/customer-update.component';
import { CustomerDeleteComponent } from './customer-delete/customer-delete.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerOrderComponent } from './customer-details/customer-order/customer-order.component';



@NgModule({
  declarations: [
    CustomerCreateComponent, 
    CustomerUpdateComponent, 
    CustomerDeleteComponent, 
    CustomerListComponent, 
    CustomerDetailsComponent, 
    CustomerOrderComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CustomerRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CustomerModule { }
