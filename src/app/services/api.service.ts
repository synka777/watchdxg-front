import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AccountResponse } from '../interfaces/account-response.interface';
import { TokenResponse } from '../interfaces/token-response.interface';
import { XUser } from '../interfaces/xuser.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _apiUrl: string = 'http://localhost:8000/api'

  constructor(private _http: HttpClient) { }

  getUsers(): Observable<Array<XUser>> {
    const uid = localStorage.getItem('uid')
    return this._http.get<Array<XUser>>(`${this._apiUrl}/users/?account_id=${uid}`)
  }

  getAccountId(username: string): Observable<AccountResponse> {
    return this._http.get<AccountResponse>(`${this._apiUrl}/accounts/${username}/`)
  }

  login(): Observable<TokenResponse> {
    return this._http.post<TokenResponse>(`${this._apiUrl}/token/`, { username: 'watchdxg', password: 'watchdxg' })
  }
}
