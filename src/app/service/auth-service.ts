import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {

  }

  login(loginRequest: any): Observable<any> {
    return this.httpClient.post('https://expense-tracker-lw8h.onrender.com/api/expense-tracker/v1/auth/login', loginRequest);
  }

  register(registerRequest: any): Observable<any> {
    return this.httpClient.post('https://expense-tracker-lw8h.onrender.com/api/expense-tracker/v1/auth/register', registerRequest);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  googleLogin(idToken: string): Observable<any> {
    return this.httpClient.post('https://expense-tracker-lw8h.onrender.com/api/expense-tracker/v1/auth/login/google', { idToken });
  } 
}
