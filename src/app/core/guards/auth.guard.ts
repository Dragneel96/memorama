import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

/**
 * Guarda de ruta que verifica si hay un usuario en el localStorage.
 * Si existe, redirige a la ruta "/memorama". Si no existe, redirige a la ruta principal "/".
 * @implements {CanActivate}
 */
export class AuthGuard implements CanActivate {
  /**
   * Constructor de la clase AuthGuard.
   * @param {Router} router - Inyección del servicio Router.
   */
  constructor(private router: Router) { }

  /**
   * Método que verifica si hay un usuario en el localStorage y redirige a la ruta correspondiente.
   * @param {ActivatedRouteSnapshot} route - El snapshot de la ruta actual.
   * @param {RouterStateSnapshot} state - El snapshot del estado actual del Router.
   * @return {boolean | UrlTree} - Si hay un usuario, retorna true o un UrlTree que redirige a la ruta "/memorama".
   * Si no hay usuario, retorna un UrlTree que redirige a la ruta principal "/".
   */
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

