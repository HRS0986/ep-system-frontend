import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginStatus } from "../constants";
import { AuthRoutes } from "../route-data";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoginRequiredGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.auth.isLoggedIn == LoginStatus.LOGGED_OUT) {
      this.router.navigate([AuthRoutes.Login]).then();
    }
    return this.auth.isLoggedIn == LoginStatus.LOGGED_IN;
  }

}
