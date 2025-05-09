import { MatIcon } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';


@Component({
  selector: 'app-main-layout',
  imports: [ RouterOutlet, MatIcon ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
