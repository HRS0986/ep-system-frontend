import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { LoginStatus } from "../constants";
import { AuthRoutes } from "../route-data";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoginRequiredGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean | UrlTree {
    if (this.auth.isLoggedIn == LoginStatus.LOGGED_OUT) {
      return this.router.createUrlTree([`${AuthRoutes.Root}/${AuthRoutes.Login}`]);
    } else if (!!JSON.parse(localStorage.getItem('isFirstLogin')!)) {
      return this.router.createUrlTree([`${AuthRoutes.Root}/${AuthRoutes.SignUp}`]);
    }
    return true;
  }

}
