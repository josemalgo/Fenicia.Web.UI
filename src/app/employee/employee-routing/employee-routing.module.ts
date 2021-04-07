import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { EmployeeDetailsComponent} from '../employee-details/employee-details.component';
import { EmployeeCreateComponent } from '../employee-create/employee-create.component';
import { EmployeeUpdateComponent } from '../employee-update/employee-update.component';
import { EmployeeDeleteComponent } from '../employee-delete/employee-delete.component';

const routes: Routes = [
  { path: 'list', component: EmployeeListComponent },
  { path: 'details/:id', component: EmployeeDetailsComponent },
  { path: 'create', component: EmployeeCreateComponent },
  { path: 'update/:id', component: EmployeeUpdateComponent },
  { path: 'delete/:id', component: EmployeeDeleteComponent }
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
export class EmployeeRoutingModule { }
