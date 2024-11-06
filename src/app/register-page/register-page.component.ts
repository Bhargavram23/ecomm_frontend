import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Customer } from '../common/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  registerForm: FormGroup;
  registerUrl = 'http://localhost:7070/register';
  message: string;

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    console.log("submit button clicked");
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.httpClient.post(this.registerUrl, formData).subscribe(
        (response: Customer) => {

          if (response === null) {
            this.message = "Registration failed, please try again";
            this.router.navigateByUrl("*");
          }
          else if (response.verified) {
            this.router.navigateByUrl("cart");
          }
          else {
            this.router.navigate(['reset-password'], { queryParams: { email: response.email } });
          }

        }
      );
    }
  }
}
