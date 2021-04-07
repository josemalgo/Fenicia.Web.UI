import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'employee', loadChildren: () => import('../employee/employee.module').then(m => m.EmployeeModule)},
  { path: 'product', loadChildren: () => import('../product/product/product.module').then(m => m.ProductModule)},
  { path: 'customer', loadChildren: () => import('../customer/customer.module').then(m => m.CustomerModule)},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class RoutingModule { }
