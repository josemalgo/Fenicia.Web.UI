import { NgModule } from '@angular/core';
import { CommonModule, formatCurrency } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CategoryRoutingModule } from './category-routing/category-routing.module';

import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryCreateComponent } from './category-create/category-create.component';

@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryCreateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    CategoryRoutingModule,
  ]
})
export class CategoryModule { }
