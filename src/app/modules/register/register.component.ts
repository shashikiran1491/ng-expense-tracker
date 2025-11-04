import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { RegistrationForm } from 'src/app/forms/registration-form';
import { AuthService } from 'src/app/service/auth-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSnackBarModule,
    RouterModule,
    MatCardModule,
    MatDialogModule
  ]
})
export class RegisterComponent {

  constructor(private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) {
  }

  registrationForm = new RegistrationForm();

  loginWithGoogle() {
    throw new Error('Method not implemented.');
  }

  passwordRules = {
    hasMinLength: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false
  };

  get password() {
    return this.registrationForm.get('password');
  }

  checkPasswordStrength() {
    const value = this.password?.value || '';
    this.passwordRules = {
      hasMinLength: value.length >= 8,
      hasUpper: /[A-Z]/.test(value),
      hasLower: /[a-z]/.test(value),
      hasNumber: /\d/.test(value)
    };
  }

  onSubmit() {

    const registerRequest = {
      firstName: this.registrationForm.firstName.value,
      lastName: this.registrationForm.lastName.value,
      email: this.registrationForm.email.value,
      password: this.registrationForm.password.value
    }

    this.authService.register(registerRequest).subscribe({
      next: (response) => {
        if (response && response.message === 'User Registered successfully') {
          this.snackBar.open('Registration successful. Please login to continue.', '', {
            duration: 5000
          });
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        const errorMessage = err.error?.errors?.[0] || 'Something went wrong. Please try again.';
        this.snackBar.open(errorMessage, '', {
          duration: 5000
        });
      },
    });
  }
}
