// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';

import { TokenService } from '../services/token.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService)
  const token = tokenService.accessToken

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req

  return next(authReq).pipe(
    catchError(err => { // If any request fails because of an incorrect token, refresh it
      if (err.status === 401 && tokenService.refreshToken) {
        return tokenService.refreshTokens().pipe(
          switchMap(res => {
            tokenService.storeTokens(res.access, tokenService.refreshToken!)
            const retryReq = req.clone({ setHeaders: { Authorization: `Bearer ${res.access}` } })
            return next(retryReq)
          }),
          catchError(refreshErr => {
            tokenService.logout()
            return throwError(() => refreshErr)
          })
        )
      }
      return throwError(() => err)
    })
  )
}
