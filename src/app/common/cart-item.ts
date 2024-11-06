import { Product } from "./product";

export class CartItem {
    product: Product;
    quantity: number = 1;


    setProduct(product: Product) {
        this.product = product;
    }

    setQuantity(qty: number) {
        this.quantity = qty;
    }


}
