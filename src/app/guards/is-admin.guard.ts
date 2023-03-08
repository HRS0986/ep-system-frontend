import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { CustomerRoutes } from "../route-data";
import { AuthService } from "../services/auth.service";


@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean | UrlTree {
    if (!this.auth.isAdmin()) {
      return this.router.createUrlTree([`${CustomerRoutes.Root}/${CustomerRoutes.Ep.url}`]);
    }
    return true;
  }

}
