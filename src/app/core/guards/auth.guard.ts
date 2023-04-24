import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) { }

  
  /* This is the implementation of the `CanActivate` interface in Angular, which is used to guard
  routes and prevent unauthorized access. The `canActivate` method takes in two parameters: `route`
  and `state`, which represent the current route and router state respectively. */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const username = localStorage.getItem('username');
    const currentUrl = state.url;
    if (username) {
      if (currentUrl !== '/memorama') {
        return this.router.parseUrl('/memorama');
      }
      return true;
    } else if (currentUrl !== '/') {
      return this.router.parseUrl('/');
    }
    return true;
  }
}

