import { Component } from '@angular/core';
import { Input } from '@angular/core';

import { XUser } from '../../interfaces/xuser.interface';


@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() xUser!: XUser
}
