import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { Authservice } from '../services/auth/authservice';
import { inject } from '@angular/core';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Authservice);
  const token = auth.accessToken();

  // Attach access token if available
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && auth.refreshToken()) {
        // Attempt refresh
        return auth.refresh().pipe(
          switchMap(newToken => {
            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newToken.accessToken}` }
            });
            return next(retryReq);
          })
        );
      }
      return throwError(() => error);
    })
  );

};
