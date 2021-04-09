import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  public categoryForm: FormGroup;
  public name: string;

  constructor(public dialogRef: MatDialogRef<CategoryCreateComponent>) { }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)])
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.categoryForm.controls[controlName].hasError(errorName);
  }

  public createCategory = (categoryFormValue) => {
    if(this.categoryForm.valid){
      this.name = categoryFormValue.name;
      this.dialogRef.close(this.name)
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
