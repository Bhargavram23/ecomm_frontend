import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../services/product-category.service';
import { Category } from '../common/category';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from      '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit{
  categories:Category[]=[];
  constructor(public productCategoryService:ProductCategoryService){}
  ngOnInit(): void {
    this.productCategoryService.getCategories().subscribe(
      (data)=>{this.categories=data}
    )
  }
}
