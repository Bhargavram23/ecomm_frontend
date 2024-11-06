import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../common/customer';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-reset-pwd-page',
  standalone: true,
  imports: [
    FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './reset-pwd-page.component.html',
  styleUrl: './reset-pwd-page.component.css'
})
export class ResetPwdPageComponent implements OnInit {
  resetPasswordForm: FormGroup;

  message: string;

  resetUrl = 'http://localhost:7070/reset-password';

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private httpClient: HttpClient, private router: Router) {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Add email field
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params) => {
        if (params['email']) {
          this.resetPasswordForm.patchValue({ email: params['email'] });
        }
      }
    )
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const formData = this.resetPasswordForm.value;

      // Call your service to handle password reset logic here
      this.httpClient.post(this.resetUrl, formData).subscribe(
        (response: Customer) => {
          this.router.navigateByUrl("login");
        }
      );
    }
  }


  isMismatch() {
    return this.resetPasswordForm.errors?.['mismatch'] &&
      (this.resetPasswordForm.get('confirmPassword')?.touched ||
        this.resetPasswordForm.get('confirmPassword')?.dirty);
  }
}
