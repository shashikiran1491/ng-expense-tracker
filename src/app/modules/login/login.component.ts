import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginForm } from "src/app/forms/login-form";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../header/header.component";
import { AuthService } from 'src/app/service/auth-service';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule,
            FormsModule,
            MatFormFieldModule,
            MatInputModule,
            CommonModule,
            MatSnackBarModule,
            RouterModule
       ]
})
export class LoginComponent {

  loginForm = new LoginForm();

  constructor(private authService : AuthService,
    private router: Router,
    private snackBar: MatSnackBar) {
  }

  onLogin() {

    const loginRequest = {
      email: this.loginForm.email.value,
      password: this.loginForm.password.value
      }

    this.authService.login(loginRequest).subscribe({
        next:(response) => {
          if(response && response.token) {
            sessionStorage.setItem('token', response.token);
            this.router.navigate(['/dashboard'])
          }
        },
        error : (err) => {
            this.snackBar.open('Incorrect username or password', '', {
              duration: 5000
            }); 
        },
      });
  }

  loginWithGoogle() {
    throw new Error('Method not implemented.');
  }
}
