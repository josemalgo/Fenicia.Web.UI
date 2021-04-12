import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { OrderItemCreateComponent } from '../order-item-create/order-item-create.component';
import { OrderItemListComponent } from '../order-item-list/order-item-list.component';
import { OrderItemUpdateComponent } from '../order-item-update/order-item-update.component';
import { OrderItemDeleteComponent } from '../order-item-delete/order-item-delete.component';

const routes: Routes = [
  { path: 'list', component: OrderItemListComponent},
  { path: 'create', component: OrderItemCreateComponent},
  { path: 'update/:id', component: OrderItemUpdateComponent},
  { path: 'delete/:id', component: OrderItemDeleteComponent},
  { path: 'details/:id', component: OrderItemListComponent},
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrderItemRoutingModule { }
