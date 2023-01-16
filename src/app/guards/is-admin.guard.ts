import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from "../services/authentication.service";
import { CustomerRoutes } from "../route-data";


@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) { }

  canActivate(): boolean {
    if (!this.auth.isAdmin) {
      this.router.navigate([CustomerRoutes.Ep.url]).then();
    }
    return true;
  }
  
}
