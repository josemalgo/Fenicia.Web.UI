import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'
import { MatDialog } from '@angular/material/dialog';
import { CategoryCreateComponent } from '../category-create/category-create.component';
import { Guid } from 'guid-typescript';
import { CategoryUpdateComponent } from '../category-update/category-update.component';
import { CategoryDeleteComponent } from '../category-delete/category-delete.component';
 
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit, AfterViewInit {

  public dataSource = new MatTableDataSource<Category>();
  public displayedColumns = ['id', 'name', 'update', 'delete'];  

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private categoryService: CategoryService, 
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe((data: any) => this.dataSource.data = data.categories);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openDialogAddCategory(): void {
    const dialogRef = this.dialog.open(CategoryCreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined)
      {
        this.executeCategoryCreation(result);
      }
    })
  }

  private executeCategoryCreation = (name: string) => {
    
    let category: Category = {
      id: Guid.EMPTY,
      name: name
    }

    this.categoryService.addCategory(category)
      .subscribe(result => {
        this.getCategories();
      })
  }

  openDialogUpdateCategory(id: string): void {
    const dialogRef = this.dialog.open(CategoryUpdateComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.executeCategoryUpdation(id, result);
      }
    })
  }

  private executeCategoryUpdation = (id: string, name: string) => {
    let category: Category = {
      id: id,
      name: name
    }

    this.categoryService.updateCategory(id, category)
      .subscribe(result => {
        this.getCategories();
      })
  }

  openDeleteDialog(id: string): void {
    const dialogRef = this.dialog.open(CategoryDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.categoryService.deleteCategory(id)
          .subscribe(() => {
            this.getCategories();
          });
        
      }
    })
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
