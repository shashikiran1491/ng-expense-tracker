import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { MonthYearService } from "../service/month-year-service";

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

    constructor(private router: Router,
        private monthYearService: MonthYearService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    console.warn('Session expired. Redirecting...');
                    sessionStorage.removeItem('token');
                    this.router.navigate(['/login']);
                }
                return throwError(() => error);
            })
        );  
    }
}

