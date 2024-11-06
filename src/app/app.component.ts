import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProductListComponent } from "./product-list/product-list.component";
import { CategoryListComponent } from "./category-list/category-list.component";
import { ProductSearchComponent } from "./product-search/product-search.component";
import { CartShortcutComponent } from "./cart-shortcut/cart-shortcut.component";
import { LoginButtonComponent } from './login-button/login-button.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    ProductListComponent, CategoryListComponent, ProductSearchComponent, RouterModule,
    CartShortcutComponent, LoginButtonComponent, LogoutButtonComponent, CommonModule,
    FormsModule, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  isUserLoggedIn: boolean = false;
  title = 'ecomm_frontend';

  constructor(authService: AuthService) {
    this.isUserLoggedIn = authService.isloggedUser;
    authService.loggedEvent.subscribe(
      (isUserLogged) => {
        this.isUserLoggedIn = isUserLogged;
        console.log("event triggered to app component", this.isUserLoggedIn);
      }
    )
  }

}
