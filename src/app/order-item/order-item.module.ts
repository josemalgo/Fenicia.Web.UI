import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderItemCreateComponent } from './order-item-create/order-item-create.component';
import { OrderItemListComponent } from './order-item-list/order-item-list.component';
import { OrderItemUpdateComponent } from './order-item-update/order-item-update.component';
import { OrderItemDeleteComponent } from './order-item-delete/order-item-delete.component';
import { OrderItemDetailsComponent } from './order-item-details/order-item-details.component';

@NgModule({
  declarations: [
    OrderItemCreateComponent, 
    OrderItemListComponent, 
    OrderItemUpdateComponent, 
    OrderItemDeleteComponent, 
    OrderItemDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class OrderItemModule { }
