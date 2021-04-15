import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { CustomerService } from '../../services/customer.service';
import { EmployeeService } from '../../services/employee.service';
import { StatusService } from '../../services/status.service';
import { CountryService } from '../../services/country.service';
import { PriorityService } from '../../services/priority.service';
import { Guid } from 'guid-typescript';
import { Order } from 'src/app/models/order.model';
import { Customer } from 'src/app/models/customers/customer.model';
import { Employee } from 'src/app/models/employee.model';
import { Country } from 'src/app/models/country.model';
import { Address } from '../../models/address.model';
import { Location } from '@angular/common';
import { OrderItem } from 'src/app/models/OrderItem.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.css']
})
export class OrderUpdateComponent implements OnInit {

  public orderForm: FormGroup;
  
  customers: Customer[];
  employees: Employee[];
  countries: Country[];
  orderItems: OrderItem[];
  statusOptions: any[];
  priorityOptions: any[];
  countrySelected: Country;
  statusSelected: any;
  prioritySelected: any;
  employeeSelected: Employee;
  customerSelected: Customer;

  constructor(private orderService: OrderService, private customerService: CustomerService,
    private employeeService: EmployeeService, private location: Location,
    private statusService: StatusService, private priorityService: PriorityService,
    private countryService: CountryService, private route: ActivatedRoute ) { }

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
    this.getOrderById();
  }

  getOrderById(): void {
    let id = this.route.snapshot.paramMap.get("id");

    this.orderService.getOrderById(id)
      .subscribe((data: any) => {
        this.orderForm.patchValue({
          description: data.order.deliveryAddress,
          zipCode: data.order.deliveryZipCode,
          city: data.order.deliveryCity,
          country: data.order.deliveryCountry,
          status: data.order.status,
          priority: data.order.priority,
          iva: data.order.iva
        });

        this.getEmployeeById(data.order.employeeId);
        this.getCustomerById(data.order.customerId);
        this.countrySelected = data.order.deliveryCountry;
        this.statusSelected = data.order.status;
        this.prioritySelected = data.order.priority;

      });
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

  getEmployeeById(id: string): void {
    this.employeeService.getEmployeesById(id)
      .subscribe((data: any) => {
        this.employees.forEach(element => {
          if(element.id === data.employeeId){
            this.employeeSelected = element;
          }
        });
      });
  }

  getCustomerById(id: string): void {
    this.customerService.getCustomersById(id)
      .subscribe((data: any) => {
        this.customers.forEach(element => {
          if(element.id == data.customer.id){
            this.customerSelected = element;
          }
        });
      });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.orderForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public updateOrder = (orderFormValue) => {
    if (this.orderForm.valid) {
      this.executeOrderUpdation(orderFormValue);
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.customerSelected === o2.customerSelected : o1 === o2;
  }

  private executeOrderUpdation = (orderFormValue) => {
    let id = this.route.snapshot.paramMap.get("id");

    let address: Address = {
      id: Guid.EMPTY,
      description: orderFormValue.description,
      zipCode: orderFormValue.zipCode,
      city: orderFormValue.City,
      countryId: orderFormValue.countryId
    };
        
    let order: Order = {
      id: id,
      customerId: orderFormValue.customer,
      employeeId: orderFormValue.employee,
      deliveryAddress: address,
      priority: orderFormValue.priority,
      status: orderFormValue.status,
      iva: orderFormValue.iva,
      orderItems: this.orderItems
    };

    this.orderService.updateOrder(id, order)
      .subscribe();
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

  addItems(newItems: OrderItem[]): void {
    this.orderItems = newItems;
  }
}
