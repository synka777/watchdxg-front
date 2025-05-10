import { RouterModule, RouterOutlet } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main-layout',
  imports: [ RouterOutlet, MatIcon, RouterModule, CommonModule ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit{
  isCollapsed: boolean = false
  isScreenSmall: boolean = false

  private _userPrefersCollapse!: boolean

  constructor (
    private _router: Router,
    private _breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    // Get the user's sidebar preference from localStorage
    this._userPrefersCollapse = localStorage.getItem('sidebarCollapsed') === 'true';

    // Observe changes in screen size (auto collapse when small screen)
    this._breakpointObserver
    .observe(['(max-width: 768px)'])
    .subscribe(result => {
      this.isScreenSmall = result.matches;
      this.updateCollapseState();
    });

    // Ensure the collapse state is set initially
    this.updateCollapseState();
  }

  // Toggle the sidebar collapse and store preference in localStorage
  toggleSidebar() {
    this._userPrefersCollapse = !this._userPrefersCollapse
    localStorage.setItem('sidebarCollapsed', String(this._userPrefersCollapse))
    this.updateCollapseState()
  }

  // Update collapse state based on screen size or user preference
  updateCollapseState() {
    this.isCollapsed = this.isScreenSmall || this._userPrefersCollapse
  }

  logout() {
    localStorage.removeItem('login')
    this._router.navigate(['/login'])
  }
}
