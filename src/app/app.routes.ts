import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PaymentsucessComponent } from './paymentsucess/paymentsucess.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ResetPwdPageComponent } from './reset-pwd-page/reset-pwd-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminOrderDashboardComponent } from './admin-order-dashboard/admin-order-dashboard.component';

export const routes: Routes = [
    {
        path: "category",
        component: ProductListComponent
    },
    {
        path: "cart",
        component: CartDetailsComponent
    },
    {
        path: "search",
        component: ProductListComponent
    },
    {
        path: "checkout",
        component: CheckoutComponent
    },
    {
        path: "product/:id",
        component: ProductDetailsComponent
    },
    {
        path: "login",
        component: LoginPageComponent
    },
    {
        path: "register",
        component: RegisterPageComponent
    },
    {
        path: "reset-password",
        component: ResetPwdPageComponent
    },
    {
        path: "payment-sucess",
        component: PaymentsucessComponent

    },
    {
        path: "admin/dashboard",
        component: DashboardComponent
    },
    {
        path: "admin/orders",
        component: AdminOrderDashboardComponent
    },
    {
        path: "**",
        component: ProductListComponent
    }
];
