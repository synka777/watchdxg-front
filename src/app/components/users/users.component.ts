import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs/operators';

import { UserCardComponent } from '../user-card/user-card.component';
import { XUser } from '../../interfaces/xuser.interface';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-users',
  imports: [ CommonModule, UserCardComponent ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  users!: Array<XUser>
  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    this._apiService.getUsers()
    .pipe(
      tap((users: Array<XUser>) => {
        this.users = users
        console.log(users)
      })
    ).subscribe()
  }
}
