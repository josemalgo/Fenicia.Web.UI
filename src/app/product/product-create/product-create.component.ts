import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/products/product.model';
import { ProductService } from '../../services/product.service';
import { Location } from '@angular/common';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product;
  categories: Category[];
  public productForm: FormGroup;

  constructor(private productService: ProductService, 
    private categoryService: CategoryService,
    private location: Location) { }

  ngOnInit(): void {
    this.fillCategories();
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      stock: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    });
  }

  fillCategories(): void {
    this.categoryService.getCategories()
      .subscribe((data: any) => this.categories = data.categories);
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.productForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public createProduct = (productFormValue) => {
    if (this.productForm.valid) {
      this.executeProductCreation(productFormValue);
    }
  }

  private executeProductCreation = (productFormValue) => {
    
    let product: Product = {
      id: Guid.EMPTY,
      name: productFormValue.name,
      price: productFormValue.price,
      description: productFormValue.description,
      stock: productFormValue.stock,
      category: productFormValue.category,
    };

    this.productService.addProduct(product)
      .subscribe(res => {
        this.location.back();
      },
      (error => {
        this.location.back();
      })
    )
  }

}
