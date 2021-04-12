import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing/order-routing.module';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { OrderListComponent } from './order-list/order-list.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderUpdateComponent } from './order-update/order-update.component';
import { OrderDeleteComponent } from './order-delete/order-delete.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderOrderItemAddComponent } from './order-create/order-order-item-add/order-order-item-add.component';
import { OrderOrderItemListComponent } from './order-create/order-order-item-list/order-order-item-list.component';


@NgModule({
  declarations: [
    OrderListComponent, 
    OrderCreateComponent, 
    OrderUpdateComponent, 
    OrderDeleteComponent, 
    OrderDetailsComponent,
    OrderOrderItemAddComponent,
    OrderOrderItemListComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class OrderModule { }
