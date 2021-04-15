import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { CustomerService } from '../../services/customer.service';
import { EmployeeService } from '../../services/employee.service';
import { StatusService } from '../../services/status.service';
import { AddressService } from '../../services/address.service';
import { PriorityService } from '../../services/priority.service';
import { Guid } from 'guid-typescript';
import { Order } from 'src/app/models/order.model';
import { Customer } from 'src/app/models/customers/customer.model';
import { Employee } from 'src/app/models/employee.model';
import { Address } from '../../models/address.model';
import { Country } from '../../models/country.model';
import { CountryService } from '../../services/country.service';
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
  countries: Country[];
  orderItems: OrderItem[];
  statusOptions: any[];
  priorityOptions: any[];

  constructor(private orderService: OrderService, private customerService: CustomerService,
    private employeeService: EmployeeService, private location: Location,
    private statusService: StatusService, private priorityService: PriorityService,
    private countryService: CountryService) { }

  ngOnInit(): void {
    this.orderForm = new FormGroup({
      customer: new FormControl('', [Validators.required]),
      nif: new FormControl(''),
      employee: new FormControl(''),
      dni: new FormControl(''),
      description: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      city: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      country: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required]),
      iva: new FormControl('', [Validators.required]),
    });
    this.getCustomers();
    this.getEmployees();
    this.getCountries();
    this.getStatus();
    this.getPriority();
  }

  getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe((data: any) => {
        this.customers = data.customers;
      });
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe((data: any) => {
        this.employees = data.employees;
      });
  }

  getStatus(): void {
    this.statusService.getStatus()
      .subscribe((data: any) => {
        this.statusOptions = data.statusValues;
      });
  }

  getPriority(): void {
    this.priorityService.getPriority()
      .subscribe((data: any) => {
        this.priorityOptions = data.priorities;
      });
  }

  getCountries(): void {
    this.countryService.getCountries()
      .subscribe((data: any) => {
        this.countries = data.countries;
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
    let address: Address = {
      id: Guid.EMPTY,
      description: orderFormValue.description,
      zipCode: orderFormValue.zipCode,
      city: orderFormValue.city,
      countryId: orderFormValue.country
    };
    
    if(orderFormValue.employee == ""){
      orderFormValue.employee = Guid.EMPTY;
    }

    let order: Order = {
      id: Guid.EMPTY,
      customerId: orderFormValue.customer,
      employeeId: orderFormValue.employee,
      deliveryAddress: address,
      priority: orderFormValue.priority,
      status: orderFormValue.status,
      iva: orderFormValue.iva,
      orderItems: this.orderItems
    };

    this.orderService.addOrder(order)
      .subscribe(() => {
        this.location.back();
      });
  }

  addItems(newItems: OrderItem[]): void {
    this.orderItems = newItems;
  }

  loadNif(id: string): void {
    this.customerService.getCustomersById(id)
      .subscribe((data: any) => {
        this.orderForm.patchValue({
          nif: data.customer.nif
        });
      });
  }

  loadDni(id: string): void {
    this.employeeService.getEmployeesById(id)
      .subscribe((data: any) => {
        this.orderForm.patchValue({
          dni: data.employee.dni
        });
      });
  }
}
