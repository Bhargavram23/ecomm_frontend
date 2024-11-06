import { CartItem } from "./cart-item";
import { Customer } from "./customer";
import { ShippingAddress } from "./shipping-address";

export class OrderBackendResponse {
  customer: Customer;
  address: ShippingAddress;
  purchase: Array<CartItem>
  orderQty;
  orderAmount;
}