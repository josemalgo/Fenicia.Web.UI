import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { ProductRoutingModule } from '../product-routing/product-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { ProductCreateComponent } from '../../product/product-create/product-create.component';
import { ProductDetailsComponent } from '../../product/product-details/product-details.component';
import { ProductUpdateComponent } from '../../product/product-update/product-update.component';
import { ProductDeleteComponent } from '../../product/product-delete/product-delete.component';
import { ProductListComponent } from '../../product/product-list/product-list.component';

@NgModule({
  declarations: [
    ProductCreateComponent,
    ProductDetailsComponent,
    ProductUpdateComponent,
    ProductDeleteComponent,
    ProductListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ProductRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProductModule { }
