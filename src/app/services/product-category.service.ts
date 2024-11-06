import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../common/category';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private apiProductCategory = "http://localhost:8080/api/category";
  constructor(private httpClient: HttpClient) { }
  getCategories(): Observable<Category[]> {
    return this.httpClient.get<GetCategoryResponse>(this.apiProductCategory).pipe(map(response => response._embedded.productCategories));
  }
}
interface GetCategoryResponse {
  "_embedded": {
    "productCategories": Category[]
  }
}
