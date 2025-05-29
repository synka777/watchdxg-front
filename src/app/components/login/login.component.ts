import { catchError, tap, of, finalize, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountResponse } from '../../interfaces/account-response.interface';
import { LoginResponse } from '../../interfaces/login-response.interface';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-login',
  imports: [ FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = ''
  password: string = ''

  constructor(private _router: Router, private _apiService: ApiService) {}

  // onSubmit() {
  //   if(this.username && this.password){
  //     try {
  //       localStorage.setItem('login', 'true')
  //     } catch(error) {
  //       console.error('Unable to store login status')
  //     } finally {
  //       this.router.navigate(['/main/dashboard'])
  //     }
  //   }
  // }
  onSubmit() {
    // First we need to get a token with the default credentials
    this._apiService.login()
    .pipe( // Define a custom interface to understand what's returned by the API call
      tap((res: LoginResponse) => {
        try {
          console.log(res.access)
          localStorage.setItem('access', res.access)
          localStorage.setItem('refresh', res.refresh)
        } catch (error) {
          console.error('Error storing token in localStorage', error)
          throw error
        }
      }),
      catchError(err => {
        console.error('Unable to get tokens')
        return of(err)
      }),
      switchMap(() => this._apiService.getAccountId(this.username)),
      tap((res: AccountResponse) => {
        if (
          localStorage.getItem('access')
          && res.id
        ) {
          // Set XAccount details for later use, then navigate to homepage
          localStorage.setItem('handle', this.username)
          localStorage.setItem('uid', res.id);
          this._router.navigate(['/main/dashboard'])
        } else {
          console.error('Token not found, redirect failed')
        }
      }),
    ).subscribe()
  }
}
