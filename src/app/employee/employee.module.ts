import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing/employee-routing.module';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent} from './employee-details/employee-details.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component';
import { EmployeeOrdersComponent } from './employee-details/employee-orders/employee-orders.component';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeDetailsComponent, 
    EmployeeCreateComponent, 
    EmployeeUpdateComponent, 
    EmployeeDeleteComponent, 
    EmployeeOrdersComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    EmployeeRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class EmployeeModule { }
