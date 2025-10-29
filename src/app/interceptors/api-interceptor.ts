import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { AuthService } from "../service/auth-service";


@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {

  }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //request = request.clone({ url: `${environment.baseUrl}${request.url}`});

    const token = this.authService.getToken();

    if(token) {
      const cloned = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next.handle(cloned);
    }
    return next.handle(request);
  }
}
