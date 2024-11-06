import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../common/product';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [JsonPipe, RouterModule, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: Product = new Product(null, null, null, null, null, null, null, null, null, null);
  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService) { }
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProductsForProductId(productId).subscribe(
      (productRecieved) => {
        this.product = productRecieved;
      }
    )
  }

  addToCart(product: Product) {
    this.cartService.addProductToCart(product);
  }
}
