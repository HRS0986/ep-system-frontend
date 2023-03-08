import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { CustomerRoutes } from "../route-data";

@Injectable({
  providedIn: 'root'
})
export class SignupGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean | UrlTree {
    const isFirstLogin = !!JSON.parse(localStorage.getItem('isFirstLogin')!);

    if (!isFirstLogin) {
      return this.router.createUrlTree([`${CustomerRoutes.Root}/${CustomerRoutes.Ep.url}`]);
    }
    return true;
  }

}
