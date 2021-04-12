import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/products/product.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { ProductUpdate } from 'src/app/models/products/productUpdate.model';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})

export class ProductUpdateComponent implements OnInit {

  public productForm: FormGroup;
  product: Product;
  categories: Category[];

  constructor(private productService: ProductService,
    private route: ActivatedRoute, private location: Location,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProduct();
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      stock: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    });
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe((data: any) => {
        this.categories = data.categories;
      });
  }

  getProduct(): void {
    let id = this.route.snapshot.paramMap.get("id");

    this.productService.getProductById(id)
      .subscribe((data: any) => {
        this.productForm.setValue({
          name: data.product.name,
          price: data.product.price,
          description: data.product.description,
          stock: data.product.stock,
          category: data.product.category
        })
      });
  }

  onCancel(): void {
    this.location.back();
  }

  updateProduct(productFormValue): void{
    if(this.productForm.valid){
      this.executionProductUpdation(productFormValue);
      this.location.back();
    }
  }

  private executionProductUpdation = (productFormValue) => {
    let id = this.route.snapshot.paramMap.get("id");

    let product: ProductUpdate = {
      id: id,
      name: productFormValue.name,
      price: productFormValue.price,
      description: productFormValue.description,
      stock: productFormValue.stock,
      categoryId: productFormValue.category.id,
    };

    this.productService.updateProduct(id, product)
      .subscribe(() => {

      })
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.productForm.controls[controlName].hasError(errorName);
  }
}
