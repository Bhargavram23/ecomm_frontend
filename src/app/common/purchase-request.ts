import { PurchaseItem } from "./purchase-item";

export class PurchaseRequest {
    orderItems: Array<PurchaseItem>;
    orderId;
    orderQty;
    orderPrice;
    razorPayId;
    razorPayOrderId;
    customerId;
    name;
    email;
    phoneNumber;
    addressId;
    line1;
    line2;
    city;
    state;
    country;
    zipcode;
}