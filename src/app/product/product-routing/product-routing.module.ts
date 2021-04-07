import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ProductCreateComponent } from '../../product/product-create/product-create.component';
import { ProductDetailsComponent } from '../../product/product-details/product-details.component';
import { ProductUpdateComponent } from '../../product/product-update/product-update.component';
import { ProductDeleteComponent } from '../../product/product-delete/product-delete.component';
import { ProductListComponent } from '../../product/product-list/product-list.component';

const routes: Routes = [
  { path: 'list', component: ProductListComponent },
  { path: 'details/:id', component: ProductDetailsComponent },
  { path: 'create', component: ProductCreateComponent },
  { path: 'update/:id', component: ProductUpdateComponent },
  { path: 'delete/:id', component: ProductDeleteComponent }
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
export class ProductRoutingModule { }
