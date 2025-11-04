import { HttpInterceptorFn } from "@angular/common/http";

export const apiInterceptor: HttpInterceptorFn = (request, next) => {

    const token = sessionStorage.getItem('token');

    if (token) {
        const cloned = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next(cloned);
    }
    return next(request);
}
