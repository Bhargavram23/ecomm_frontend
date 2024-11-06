import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from '../common/cart-item';
import { CommonModule, CurrencyPipe, DecimalPipe, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../common/product';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [JsonPipe, FormsModule, CommonModule, DecimalPipe, CurrencyPipe, RouterLink],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit {
  cart: Array<CartItem>;
  totalItems: number;
  totalAmount: number;
  constructor(private cartService: CartService, authService: AuthService, route: Router) {
    this.cart = this.cartService.cart;
    this.totalItems = this.cartService.getTotalCartItems();
    this.totalAmount = this.cartService.getTotalCartAmount();
    if (!authService.isloggedUser) {
      route.navigateByUrl("/login");
    }
    authService.loggedEvent.subscribe(
      (isUserLogged) => {
        if (!isUserLogged) {
          route.navigateByUrl("/login");
        }
      }
    )
  }
  ngOnInit(): void {

    this.cartService.onCartDetailsUpdatedEvent.subscribe(
      (cartDetails) => {

        this.cart = cartDetails.cart;
        this.totalItems = cartDetails.cart_item_count;
        this.totalAmount = cartDetails.cart_total;
      }
    );
  }

  reduceQantity(product: Product) {
    this.cartService.reduceProductFromCart(product);
  }

  increaseQuantity(product: Product) {
    this.cartService.addProductToCart(product);
  }

  removeProductFromCart(product: Product) {
    this.cartService.removeProductFromCart(product);
  }

}
