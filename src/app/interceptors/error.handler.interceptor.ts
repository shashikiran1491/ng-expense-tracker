import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (request, next) => {

    const snackBar = inject(MatSnackBar);
    const router = inject(Router);

    return next(request).pipe(
        catchError((err) => {
            if (err.status === 401) {
                console.warn('Session expired. Redirecting...');
                sessionStorage.removeItem('token');
                router.navigate(['/login']);
            }
            return throwError(() => err);
        })
    );
}