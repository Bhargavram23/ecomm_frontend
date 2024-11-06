import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.css'
})
export class LogoutButtonComponent {
  constructor(private authService: AuthService) {
  }
  logoutClick() {

    this.authService.logoutUser();
  }
}
