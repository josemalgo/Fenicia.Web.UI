import { Component, OnInit, Input, Output} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { CustomerService } from '../../services/customer.service';
import { EmployeeService } from '../../services/employee.service';
import { Guid } from 'guid-typescript';
import { Order } from 'src/app/models/order.model';
import { Customer } from 'src/app/models/customers/customer.model';
import { Employee } from 'src/app/models/employee.model';
import { Address } from '../../models/address.model';
import { Location } from '@angular/common';
import { OrderItem } from 'src/app/models/OrderItem.model';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {

  public orderForm: FormGroup;
  
  customers: Customer[];
  employees: Employee[];
  addresses: Address[];
  orderItems: OrderItem[];
  statusOptions: any[];
  priorityOptions: any[];
  customerId: string;

  constructor(private orderService: OrderService, private customerService: CustomerService,
    private employeeService: EmployeeService, private location: Location) { }

  ngOnInit(): void {
    this.orderForm = new FormGroup({
      customerId: new FormControl('', [Validators.required]),
      employeeId: new FormControl('', [Validators.required]),
      addressId: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required]),
      iva: new FormControl('', [Validators.required]),
    });
    this.getCustomers();
    this.getEmployees();
  }

  getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe((data: any) => {
        this.customers = data.customers;
        this.addresses = data.customers.addresses;
      });
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe((data: any) => {
        this.employees = data.employees;
      });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.orderForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public createOrder = (orderFormValue) => {
    if (this.orderForm.valid) {
      this.executeOrderCreation(orderFormValue);
    }
  }

  private executeOrderCreation = (orderFormValue) => {
    let order: Order = {
      id: Guid.EMPTY,
      customerId: orderFormValue.customerId,
      employeeId: orderFormValue.employeeId,
      addressId: orderFormValue.addressId,
      priority: orderFormValue.priority,
      status: orderFormValue.status,
      orderItems: this.orderItems
    };

    //this.orderService.addOrder()
  }


}
