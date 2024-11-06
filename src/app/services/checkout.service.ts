import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { OrderBackendResponse } from '../common/order-backend-response';
import { PurchaseItem } from '../common/purchase-item';
import { PurchaseRequest } from '../common/purchase-request';
import { TxnResponse } from '../common/txn-response';
import { Router } from '@angular/router';

declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  postOrderUrl = "http://localhost:9090/order";
  postOrderVerifyUrl = "http://localhost:9090/verify";
  razorPayKey = 'rzp_test_UKY2DzhQPRLJoi';

  orderList: Array<PurchaseItem> = [];
  constructor(private httpClient: HttpClient, private cartService: CartService, private router: Router) { }

  sendOrder(response: OrderBackendResponse) {


    let purchaseRequest: PurchaseRequest = this.organizeRequest(response)
    this.checkoutOrder(purchaseRequest).subscribe(
      (response) => {
        this.handleRazorpayProcessing(response);
      }
    );;

  }

  organizeRequest(resonse: OrderBackendResponse): PurchaseRequest {
    let purchaseRequest = new PurchaseRequest();
    // personal details
    purchaseRequest.name = resonse.customer.name;
    purchaseRequest.email = resonse.customer.email;
    purchaseRequest.phoneNumber = resonse.customer.phoneNumber;


    // address details
    purchaseRequest.line1 = resonse.address.line1;
    purchaseRequest.line2 = resonse.address.line2;
    purchaseRequest.city = resonse.address.city;
    purchaseRequest.state = resonse.address.state;
    purchaseRequest.country = resonse.address.country;
    purchaseRequest.zipcode = resonse.address.zipcode;


    // convert orderitem into purchase items for working with order details
    purchaseRequest.orderQty = resonse.orderQty;
    purchaseRequest.orderPrice = resonse.orderAmount;

    let purchaseItem: PurchaseItem = new PurchaseItem();

    resonse.purchase.forEach(
      (orderItem) => {
        purchaseItem = new PurchaseItem();
        purchaseItem.id = orderItem.product.id;
        purchaseItem.name = orderItem.product.name;
        purchaseItem.quantity = orderItem.quantity;
        purchaseItem.imageUrl = orderItem.product.imageUrl;
        purchaseItem.unitPrice = orderItem.product.unitPrice;

        this.orderList.push(purchaseItem);


      }
    )


    // order details
    purchaseRequest.orderItems = this.orderList;

    return purchaseRequest;
  }

  checkoutOrder(purchaseRequest: PurchaseRequest) {

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(purchaseRequest);

    // posting an order transaction to begin.
    return this.httpClient.post<PurchaseRequest>(
      this.postOrderUrl, body, { 'headers': headers })
  }

  handleRazorpayProcessing(response) {
    const options = {
      key: this.razorPayKey, // Replace with your Razorpay Key ID
      amount: response.orderPrice * 100,
      currency: 'INR',
      name: 'Rama IT',
      description: 'Payment to RAMA IT Description here',
      order_id: response.razorPayOrderId, // Received from backend
      handler: (razorPayResponse: any) => {
        this.doPaymentProcessing(response, razorPayResponse)
      },
      modal: {
        ondismiss: (razorPayResponse) => {

          this.doPaymentProcessing(response, razorPayResponse)
        }
      },
      prefill: {
        name: response.name,
        email: response.email,
        contact: response.phoneNumber
      },
      theme: {
        color: '#F37254'
      }
    };

    const razorpay = new Razorpay(options);
    razorpay.open();

  }

  doPaymentProcessing(response, razorPayResponse): any {

    let purchaseRequest: PurchaseRequest = new PurchaseRequest();
    purchaseRequest.orderId = response.orderId;

    if (razorPayResponse !== undefined) {

      purchaseRequest.razorPayOrderId = razorPayResponse.razorpay_order_id;
      purchaseRequest.razorPayId = razorPayResponse.razorpay_payment_id;

      // empty the cart
      this.cartService.emptyCart();

      // redirect to 

    }

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(purchaseRequest);

    // posting and verifying the transaction to begin.
    this.httpClient.post(
      this.postOrderVerifyUrl, body, { 'headers': headers }).subscribe(
        (response: TxnResponse) => {

          if (response.message === "success") {
            this.router.navigate(["payment-sucess"]);
          }
          else {
            // alert the payment failure
            alert("Your payment has failed, please retry. your order is not confirmed yet.")
          }
        }
      );

  }
}





