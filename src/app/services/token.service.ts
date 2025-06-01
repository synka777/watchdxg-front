import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { TokenResponse } from '../interfaces/token-response.interface';


@Injectable({ providedIn: 'root' })
export class TokenService {
  private _apiUrl: string = '_http://localhost:8000/api'

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {}

  get accessToken(): string | null {
    return localStorage.getItem('access')
  }

  get refreshToken(): string | null {
    return localStorage.getItem('refresh')
  }

  storeTokens(access: string, refresh: string): void {
    localStorage.setItem('access', access)
    localStorage.setItem('refresh', refresh)
  }

  refreshTokens(): Observable<TokenResponse> {
    return this._http.post<TokenResponse>(`${this._apiUrl}/token/refresh/`, {
      refresh: this.refreshToken
    })
  }

  logout() {
    const keys = ['access', 'refresh', 'handle', 'uid']
    for (const key of keys) {
      localStorage.removeItem(key)
    }
    this._router.navigate(['/login'])
  }
}
