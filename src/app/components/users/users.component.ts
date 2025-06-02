import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { UserCardComponent } from '../user-card/user-card.component';
import { XUser } from '../../interfaces/xuser.interface';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-users',
  imports: [ CommonModule, UserCardComponent, NgIf ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  users!: Array<XUser>
  loading: Boolean = true
  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    this._apiService.getUsers()
    .pipe(
      tap((users: Array<XUser>) => {
        if (users) {
          this.users = users
          this.loading = false
        }
      })
    ).subscribe()
  }
}
