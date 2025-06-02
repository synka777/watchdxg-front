import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot, // This represents the route being accessed. Provides:
    // - Route params, data, query params, etc.
    // - The path and component being navigated to.
    state: RouterStateSnapshot // Represents the entire router state at the moment
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('access') // If no token found, redirect to login
    if(token) {
      // Check if the user is trying to access the login page when already logged in
      if (state.url === '/login') {
        this.router.navigate(['/main/dashboard'], { replaceUrl: true }) // If so, redirect to the main page
        return false // Prevent access to the login page
      }
      return true
    } else {
      if (state.url !== '/login') {
        // If not logged in and trying to access any route other than /login, redirect to /login
        this.router.navigate(['/login'], { replaceUrl: true });
      }
      // Allow access to /login only if not logged in
      return state.url === '/login'
    }
  }
}
