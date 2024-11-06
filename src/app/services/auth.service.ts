import { EventEmitter, Injectable, Output } from '@angular/core';
import { Customer } from '../common/customer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedUser: string = '';
  loggedUserRole: string = '';
  isloggedUser: boolean = false;

  @Output()
  loggedEvent = new EventEmitter<boolean>();

  constructor() {
    this.loggedUser = localStorage.getItem("username");
    this.loggedUserRole = localStorage.getItem("role");
    this.isloggedUser = this.loggedUser === null || this.loggedUser === undefined ? false : true;
  }

  loginUser(customer: Customer) {
    localStorage.setItem("username", customer.name);
    localStorage.setItem("role", customer.role);
    this.isloggedUser = true;
    this.loggedEvent.emit(true);
  }

  logoutUser() {
    this.isloggedUser = false;
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    this.loggedEvent.emit(false);
  }

}
