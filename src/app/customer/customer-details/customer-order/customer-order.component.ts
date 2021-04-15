import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table';
import { Guid } from 'guid-typescript';
import { Order } from '../../../models/order.model';
import { CustomerService } from '../../../services/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.css']
})
export class CustomerOrderComponent implements OnInit, AfterViewInit {

  public dataSourceCompleted = new MatTableDataSource<Order>();
  ordersCompleted: Order[];
  displayedColumns = ['employee', 'customer', 'status', 'priority', 'numberItems', 'totalPrice', 'detail'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private customerService: CustomerService,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.getCustomerById();
    }
  
    getCustomerById(): void {
      let id = this.route.snapshot.paramMap.get("id");
  
      this.customerService.getCustomersById(id)
        .subscribe((data: any) => {
          this.dataSourceCompleted = data.customer.ordersCompleted;
        })
    }
  
    redirectToDetails(id: Guid): void {
      let url: string = `/order/details/${id}`;
      this.router.navigate([url]);
    }
  
    ngAfterViewInit(): void {
      this.dataSourceCompleted.sort = this.sort;
      this.dataSourceCompleted.paginator = this.paginator;
    }

    public doFilterCompleted = (value: string) => {
      this.dataSourceCompleted.filter = value.trim().toLocaleLowerCase();
    }
}
