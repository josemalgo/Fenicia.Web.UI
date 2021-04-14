import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeModule } from './employee/employee.module';
import { RoutingModule } from './routing/routing.module';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductModule } from './product/product/product.module';
import { CustomerModule } from './customer/customer.module';
import { CategoryModule } from './category/category.module';
import { SharedModule } from './shared/shared.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { AddressUpdateComponent } from './address/address-update/address-update.component';

@NgModule({
  declarations: [
    AppComponent,
    AddressUpdateComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    EmployeeModule,
    BrowserAnimationsModule,
    MaterialModule,
    RoutingModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    ProductModule,
    CustomerModule,
    CategoryModule,
    SharedModule,
    OrderModule,
    OrderItemModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
