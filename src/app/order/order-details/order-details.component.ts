import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table'; 
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit, AfterViewInit {

  public dataSource = new MatTableDataSource<Order>();
  displayedColumns = ['productId', 'description', 'quantity', 'unitPrice', 'discount', 'amount' ];
  public orderForm: FormGroup;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private orderService: OrderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.getOrderById();
    this.orderForm = new FormGroup({
      id: new FormControl(''),
      entryDate: new FormControl(''),
      assignamentDate: new FormControl(''),
      terminationDate: new FormControl(''),
      status: new FormControl(''),
      priority: new FormControl(''),
      customerTradeName: new FormControl(''),
      customerFiscalName: new FormControl(''),
      customerAddress: new FormControl(''),
      customerCity: new FormControl(''),
      customerCountry: new FormControl(''),
      customerPhone: new FormControl(''),
      customerEmail: new FormControl(''),
      deliveryAddress: new FormControl(''),
      deliveryZipCode: new FormControl(''),
      deliveryCity: new FormControl(''),
      deliveryCountry: new FormControl(''),
      subTotalPrice: new FormControl(''),
      iva: new FormControl(''),
      totalPrice: new FormControl(''),
   });
   this.orderForm.disabled;

  }

  getOrderById(): void {
    let id = this.route.snapshot.paramMap.get("id");
    this.orderService.getOrderById(id)
      .subscribe((data: any) => {
        this.dataSource.data = data.order.orderitems;
        this.orderForm.setValue({
          id: data.order.id,
          entryDate: data.order.entryDate,
          assignamentDate: data.order.assignamentDate,
          terminationDate: data.order.terminationDate,
          status: data.order.status,
          priority: data.order.priority,
          customerTradeName: data.order.customerTradeName,
          customerFiscalName: data.order.customerFiscalName,
          customerAddress: data.order.customerAddress,
          customerCity: data.order.customerCity,
          customerCountry: data.order.customerCountry,
          customerPhone: data.order.customerPhone,
          customerEmail: data.order.customerEmail,
          deliveryAddress: data.order.deliveryAddress,
          deliveryzipCode: data.order.deliveryZipCode,
          deliveryCity: data.order.deliveryCity,
          deliveryCountry: data.order.deliveryCountry,
          subTotalPrice: data.order.subTotalPrice,
          iva: data.order.iva,
          totalPrice: data.order.totalPrice,
        });
      })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
