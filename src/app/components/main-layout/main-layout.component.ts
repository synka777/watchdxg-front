import { MatIcon } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-main-layout',
  imports: [ RouterOutlet, MatIcon, RouterModule, CommonModule ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  isCollapsed: boolean = false

  constructor() {
    this.checkViewport()
    window.addEventListener('resize', () => {
      this.checkViewport()
    })
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed
  }

  checkViewport() {
    this.isCollapsed = window.innerWidth < 768
  }
}
