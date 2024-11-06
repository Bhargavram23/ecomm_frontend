import { Component, OnInit } from '@angular/core';
import { Product } from '../common/product';
import { ProductService } from '../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  productId = 0;
  products: Product[] = [];

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (param) => {

        if (param['value'] !== undefined) {
          this.productService.getProductsForRefName(param['value']).subscribe(data => {
            this.products = data;
          })
        }

        else if (isNaN(param['id'])) {
          // when path does not have any id value
          this.productService.getProducts().subscribe(data => {
            this.products = data;
          })
        }
        else {
          // when path has id value
          this.productId = param['id'];
          this.productService.getProductsForId(this.productId).subscribe(data => {
            this.products = data;
          })
        }

      }
    )
  }

  addToCart(product: Product) {
    this.cartService.addProductToCart(product);
  }
}