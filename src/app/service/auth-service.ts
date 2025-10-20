import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
    
  }

  login(loginRequest: any) : Observable<any> {
      return this.httpClient.post('http://localhost:8080/api/expense-tracker/v1/auth/login', loginRequest);
    }

    getToken(): string | null {
      return sessionStorage.getItem('token');
    }

    isLoggedIn(): boolean {
      return !!this.getToken();
    }

}
