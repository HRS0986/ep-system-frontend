import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CustomerRoutes } from "../route-data";
import { AuthService } from "../services/auth.service";


@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (!this.auth.isAdmin()) {
      this.router.navigate([`${CustomerRoutes.Root}/${CustomerRoutes.Ep.url}`]).then();
    }
    return true;
  }

}
