import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cart-shortcut',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, DecimalPipe],
  templateUrl: './cart-shortcut.component.html',
  styleUrl: './cart-shortcut.component.css'
})
export class CartShortcutComponent implements OnInit {
  cartItemsCount = 0;
  cartTotalAmount = 0;
  constructor(private cartService: CartService) { }
  ngOnInit(): void {
    this.cartService.onCartDetailsUpdatedEvent.subscribe(
      (cartDetails) => {

        this.cartItemsCount = cartDetails.cart_item_count;
        this.cartTotalAmount = cartDetails.cart_total;
      }
    )
  }

}
