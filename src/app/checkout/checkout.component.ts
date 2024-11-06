import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OrderBackendResponse } from '../common/order-backend-response';
import { CartService } from '../services/cart.service';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  formGroup: FormGroup
  constructor(private formBuider: FormBuilder, private cartService: CartService, private checkoutservice: CheckoutService) {
    this.formGroup = this.formBuider.group(
      {
        shippingAddress: this.formBuider.group(
          {

            line1: ['line 1...'],
            line2: ['line 2...'],
            city: ['fakecity'],
            state: ['fakestate'],
            country: ['fakecountry'],
            zipcode: ['5000']
          }
        ),

        personalDetails: this.formBuider.group(
          {
            name: ['fakename'],
            email: ['fakename@gmail.com'],
            phoneNumber: ['9385565878'],
          }
        )
      }
    )

  }

  submitProcess() {

    let backendResponse: OrderBackendResponse = new OrderBackendResponse();
    backendResponse.address = this.formGroup.value.shippingAddress;
    backendResponse.customer = this.formGroup.value.personalDetails;
    backendResponse.purchase = this.cartService.cart;

    backendResponse.orderQty = this.cartService.getTotalCartItems();
    backendResponse.orderAmount = this.cartService.getTotalCartAmount();
    this.checkoutservice.sendOrder(backendResponse);
  }
}




