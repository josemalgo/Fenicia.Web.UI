import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { OrderListComponent } from '../order-list/order-list.component';
import { OrderDeleteComponent } from '../order-delete/order-delete.component';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { OrderCreateComponent } from '../order-create/order-create.component';
import { OrderUpdateComponent } from '../order-update/order-update.component';

const routes: Routes = [
  { path: 'list', component: OrderListComponent},
  { path: 'details/:id', component: OrderDetailsComponent},
  { path: 'create', component: OrderCreateComponent},
  { path: 'update/:id', component: OrderUpdateComponent},
  { path: 'delete/:id', component: OrderDeleteComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class OrderRoutingModule { }
