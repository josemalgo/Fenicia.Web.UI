import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Order } from 'src/app/models/order.model';
import { Guid } from 'guid-typescript';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OrderDeleteComponent } from '../order-delete/order-delete.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})

export class OrderListComponent implements OnInit, AfterViewInit {

  public dataSource = new MatTableDataSource<Order>();
  orders: Order[];
  displayedColumns = ['employee', 'customer', 'status', 'priority', 'numberItems', 'totalPrice', 'detail', 'update', 'delete'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private orderService: OrderService, private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fillTableOrders();
  }

  fillTableOrders(): void {
    this.orderService.getOrders()
      .subscribe((data: any) => {
        this.dataSource.data = data.orders;
      })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  
  redirectToDetails(id: Guid): void {
    let url: string = `/order/details/${id}`;
    this.router.navigate([url]);
  }

  redirectToUpdate(id: Guid): void {
    let url: string = `/order/update/${id}`;
    this.router.navigate([url]);
  }

  openDeleteDialog(id: string): void {
    const dialogRef = this.dialog.open(OrderDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.orderService.deleteOrder(id)
        .subscribe(() => {
          this.fillTableOrders();
        });
      }
    })
  }

}
