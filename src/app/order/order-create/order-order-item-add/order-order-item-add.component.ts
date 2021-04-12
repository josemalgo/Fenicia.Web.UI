import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Product } from 'src/app/models/products/product.model';
import { ProductService } from '../../../services/product.service';
import { OrderItem } from '../../../models/OrderItem.model'; 
import { FormGroup, FormControl , Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-order-item-add',
  templateUrl: './order-order-item-add.component.html',
  styleUrls: ['./order-order-item-add.component.css']
})
export class OrderOrderItemAddComponent implements OnInit {

  public orderItemForm: FormGroup;
  @Output() newItemEvent = new EventEmitter<OrderItem>();
  products: Product[];

  constructor(private productService: ProductService, private location: Location) { }

  ngOnInit(): void {
    this.orderItemForm = new FormGroup({
      productId: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      discount: new FormControl('')
    });

    this.fillSelectProducts();
  }

  private fillSelectProducts = () => {
    this.productService.getProducts()
      .subscribe((data: any) => {
        this.products = data.products;
      })
  }

  public createOrderItem = (orderFormValue) => {
    
    let orderItem: OrderItem = {
      id: Guid.EMPTY,
      orderId: undefined,
      productId: orderFormValue.productId,
      quantity: orderFormValue.quantity,
      discount: orderFormValue.discount
    };

    this.newItemEvent.emit(orderItem);

  }
}
