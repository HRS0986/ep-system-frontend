import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginStatus } from "../constants";
import { AuthenticationService } from "../services/authentication.service";
import { UserService } from "../services/user.service";
import { AuthRoutes } from "../route-data";

@Injectable({
  providedIn: 'root'
})
export class PreventLoginGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService, private userService: UserService) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn == LoginStatus.LOGGED_IN) {
      this.router.navigate([AuthRoutes.SignUp]).then();
    }
    return this.authService.isLoggedIn != LoginStatus.LOGGED_IN;
  }

}
