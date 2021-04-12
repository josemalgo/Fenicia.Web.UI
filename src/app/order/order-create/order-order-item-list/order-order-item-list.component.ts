import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'; 
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { OrderItem } from 'src/app/models/OrderItem.model';
import { Location } from '@angular/common';
import { Guid } from 'guid-typescript';
import { MatDialog } from '@angular/material/dialog';
import { OrderOrderItemAddComponent } from '../order-order-item-add/order-order-item-add.component';

@Component({
  selector: 'app-order-order-item-list',
  templateUrl: './order-order-item-list.component.html',
  styleUrls: ['./order-order-item-list.component.css']
})

export class OrderOrderItemListComponent implements OnInit, AfterViewInit {

  public dataSource: MatTableDataSource<OrderItem>;
  displayedColumns = ['product', 'description', 'quantity', 'unitPrice', 'discount', 'amount'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() data: string;

  constructor(private location: Location, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public onCancel = () => {
    this.location.back();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public onUpdateDialog = (id: string) => {
    // const dialogRef = this.dialog.open(OrderOrderItemUpdateComponent, {
    //   data: id
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if(result != undefined){
        
    //   }
    // });
  }

  public onCreateDialog = () => {
    const dialogRef = this.dialog.open(OrderOrderItemAddComponent);

    dialogRef.afterClosed().subscribe();
  }
}
