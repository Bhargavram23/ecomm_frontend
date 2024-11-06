import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface Order {
  orderId: number;
  totalQuantity: number;
  totalPrice: number;
  orderStatus: string;
  dateCreated: string;
  lastCreated: string;
  customerId: number;
  razorPayId: string;
  razorPayOrderId: string;
  shippingAddressId: number;
}

interface PurchaseItem {
  id: number;
  name: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;
}

@Component({
  selector: 'app-admin-order-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-order-dashboard.component.html',
  styleUrl: './admin-order-dashboard.component.css'
})
export class AdminOrderDashboardComponent {
  email: string = '';
  startDate: string = '';
  endDate: string = '';
  orders: Order[] = [];
  submitted: boolean = false;
  popupVisible: boolean = false;
  purchaseItems: PurchaseItem[] = [];


  constructor(private http: HttpClient) { }

  onSubmit() {
    const requestData = {
      email: this.email,
      startDate: this.startDate,
      endDate: this.endDate
    };

    this.http.post<Order[]>('http://localhost:9090/admin/orders', requestData)
      .subscribe({
        next: (response) => {
          this.orders = response;
          this.submitted = true;
        },
        error: (error) => {
          console.error('Error fetching orders', error);
          this.orders = [];
          this.submitted = true;
        }
      });
  }

  openPopup(orderId: number) {
    this.http.get<PurchaseItem[]>(`http://localhost:9090/admin/orders/${orderId}`)
      .subscribe({
        next: (response) => {
          this.purchaseItems = response;
          this.popupVisible = true;
        },
        error: (error) => {
          console.error('Error fetching order details', error);
        }
      });
  }

  closePopup() {
    this.popupVisible = false;
    this.purchaseItems = [];
  }

}
