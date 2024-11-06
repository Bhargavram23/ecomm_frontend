import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customer } from '../common/customer';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginUrl = 'http://localhost:7070/login';
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private httpClient: HttpClient, public router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;

      this.httpClient.post(this.loginUrl, formValues).subscribe(
        (response: Customer) => {

          if (response === null) {
            this.router.navigateByUrl("register");
          }
          else if (response.verified) {
            this.authService.loginUser(response);
            this.router.navigateByUrl("cart");
          }
          else {
            this.router.navigate(['reset-password'], { queryParams: { email: response.email } });
          }
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }

}
