import { EventEmitter, Injectable, Output, output } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Product } from '../common/product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // main cart
  cart: Array<CartItem> = [];

  // event handler to update other components
  @Output()
  onCartDetailsUpdatedEvent = new EventEmitter<CartDetailsImpl>();


  constructor() {
    this.cart = [];
  }
  getCartItems(): Observable<Array<CartItem>> {
    return of(this.cart);
  }
  addProductToCart(product: Product) {
    if (this.cartContainThisItem(product)) {
      let currentProductCount = this.cart[this.indexOfProduct(product)].quantity;
      let productIndex = this.indexOfProduct(product)
      this.cart[productIndex].setQuantity(1 + currentProductCount);
    }
    else {
      let cartItem = new CartItem();
      cartItem.product = product;
      cartItem.quantity = 1;
      this.cart.push(cartItem);
    }

    this.triggerCartDetalsUpdateEvent();

  }
  removeProductFromCart(product: Product) {
    let productIndex = this.indexOfProduct(product);
    this.cart.splice(productIndex, 1);
    this.triggerCartDetalsUpdateEvent();
  }
  reduceProductFromCart(product: Product) {
    if (this.cartContainThisItem(product)) {
      let productIndex = this.indexOfProduct(product);
      let currentProductCount = this.cart[productIndex].quantity;
      if (currentProductCount === 1) {
        this.cart.splice(productIndex, 1)
      }
      else {
        this.cart[productIndex].setQuantity(currentProductCount - 1);
      }
    }
    this.triggerCartDetalsUpdateEvent();
  }



  triggerCartDetalsUpdateEvent() {

    let details = new CartDetailsImpl();
    details.setCart(this.cart);
    details.setCart_total(this.getTotalCartAmount());
    details.setCart_Item_Count(this.getTotalCartItems());

    this.onCartDetailsUpdatedEvent.emit(details);
  }

  // helping functions
  cartContainThisItem(product: Product): boolean {

    if (this.cart.length === 0) { return false }
    let flag: boolean = false;
    this.cart.forEach((cartItem) => {
      if (cartItem.product.id === product.id) {
        flag = true;
      }

    })
    return flag;
  }

  indexOfProduct(product: Product): number {
    return this.cart.findIndex((item) => { return item.product.id === product.id });
  }

  getTotalCartItems(): number {
    let itemCount: number = 0;
    this.cart.forEach((cart) => { itemCount = itemCount + cart.quantity });
    return itemCount;
  }

  getTotalCartAmount(): number {
    let totalAmount: number = 0;
    this.cart.forEach((cartItem) => { totalAmount = totalAmount + cartItem.quantity * cartItem.product.unitPrice });
    return totalAmount;
  }

  emptyCart() {
    this.cart = [];
    this.triggerCartDetalsUpdateEvent();
  }

}

interface cartDetailsInf {
  cart: Array<CartItem>;
  cart_total: number;
  cart_item_count: number;
}

class CartDetailsImpl implements cartDetailsInf {
  cart: Array<CartItem>;
  cart_total: number;
  cart_item_count: number;
  setCart(cartRecieved: Array<CartItem>) {
    this.cart = cartRecieved;
  }
  setCart_total(cartTotal: number) {
    this.cart_total = cartTotal;
  }
  setCart_Item_Count(count: number) {
    this.cart_item_count = count;
  }
}
