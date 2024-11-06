import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiProductUrl = "http://localhost:8080/api/product";
  private findProductsByCategoryIdUrl = "http://localhost:8080/api/product/search/findByCategoryCategoryId?id=";
  private findProductsByNameContainingUrl = "http://localhost:8080/api/product/search/findByNameContaining?name=";
  private findProductByProductIdUrl = "http://localhost:8080/api/product/"

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {

    return this.httpClient.get<GetResponse>(this.apiProductUrl)
      .pipe(map(response => response._embedded.products));

  }

  getProductsForId(id: number): Observable<Product[]> {

    return this.httpClient.get<GetResponse>(this.findProductsByCategoryIdUrl + id)
      .pipe(map(response => response._embedded.products));

  }

  getProductsForRefName(refvalue: string): Observable<Product[]> {
    console.log("value recieved in product service is " + refvalue);
    return this.httpClient.get<GetResponse>(this.findProductsByNameContainingUrl + refvalue)
      .pipe(map(response => response._embedded.products));

  }

  getProductsForProductId(refvalue: string): Observable<Product> {

    return this.httpClient.get<Product>(this.findProductByProductIdUrl + refvalue);

  }


}
interface GetResponse {
  _embedded: {
    products: Product[];
  }
}