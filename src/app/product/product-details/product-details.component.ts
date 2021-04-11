import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public productForm: FormGroup;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.getProduct();
    this.productForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      price: new FormControl(''),
      iva: new FormControl(''),
      description: new FormControl(''),
      stock: new FormControl(''),
      nameCategory: new FormControl(''),
    });
    this.productForm.disable();
  }

  getProduct(): void {
    let id = this.route.snapshot.paramMap.get("id");

    this.productService.getProductById(id)
      .subscribe((data: any) => {
        this.productForm.setValue({
          id: data.product.id,
          name: data.product.name,
          price: data.product.price,
          iva: data.product.iva,
          description: data.product.description,
          stock: data.product.stock,
          nameCategory: data.product.category.name
        })
      });
  }

  back(): void {
    this.location.back();
  }

}
