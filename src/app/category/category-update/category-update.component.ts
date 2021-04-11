import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {

  public categoryForm: FormGroup;
  public name: string;

  constructor(public dialogRef: MatDialogRef<CategoryUpdateComponent>, 
    @Inject (MAT_DIALOG_DATA) public data: string,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    if(this.data == undefined){
      return;
    }
    else {
      this.categoryService.getCategoryById(this.data)
      .subscribe((result: any) => {
        this.categoryForm.setValue({
          name: result.category.name, 
        })
      });
    }
    

    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.categoryForm.controls[controlName].hasError(errorName);
  }

  public updateCategory = (categoryFormValue) => {
    if(this.categoryForm.valid){
      this.name = categoryFormValue.name;
      this.dialogRef.close(this.name)
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
