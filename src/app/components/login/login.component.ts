import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = ''
  password: string = ''

  constructor(private router: Router) {}

  onSubmit() {
    if(this.username && this.password){
      try {
        localStorage.setItem('login', 'true')
      } catch(error) {
        console.error('Unable to store login status')
      } finally {
        this.router.navigate(['/main'])
      }
    }
  }
}
