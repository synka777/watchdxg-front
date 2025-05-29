import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AccountResponse } from '../interfaces/account-response.interface';
import { LoginResponse } from '../interfaces/login-response.interface';
import { XUser } from '../interfaces/xuser.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _apiUrl: string = 'http://localhost:8000/api'

  constructor(private _http: HttpClient) { }

  private _getHeaders() {
    const token = localStorage.getItem('access') // Store the token in local storage
    console.log('Retrieved token from storage:', token)
    return {
      headers: new HttpHeaders({
        authorization: `Bearer ${token}`
      })
    }
  }

  getUsers(): Observable<Array<XUser>>{
    const uid = localStorage.getItem('uid')
    return this._http.get<Array<XUser>>(`${this._apiUrl}/users/?account_id=${uid}`, this._getHeaders())
  }

  getAccountId(username: string): Observable<AccountResponse>{
    return this._http.get<AccountResponse>(`${this._apiUrl}/accounts/${username}/`, this._getHeaders())
  }

  login(): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(`${this._apiUrl}/token/`, { username: 'watchdxg', password: 'watchdxg' })
  }

  logout(): void {
    localStorage.removeItem('refresh');
    localStorage.removeItem('access');
  }
}
