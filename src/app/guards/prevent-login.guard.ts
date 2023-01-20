import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginStatus } from "../constants";
import { UserService } from "../services/user.service";
import { AuthRoutes } from "../route-data";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class PreventLoginGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn == LoginStatus.LOGGED_IN) {
      this.router.navigate([AuthRoutes.SignUp]).then();
    }
    return this.authService.isLoggedIn != LoginStatus.LOGGED_IN;
  }

}
