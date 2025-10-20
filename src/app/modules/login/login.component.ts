import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginForm } from "src/app/forms/login-form";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../shared/header/header.component";
import { AuthService } from 'src/app/service/auth-service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpStatusCode } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
            MatSnackBarModule
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
}
