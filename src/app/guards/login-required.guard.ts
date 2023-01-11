import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginStatus, RouterData } from "../constants";
import { AuthenticationService } from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class LoginRequiredGuard implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router,) { }

  canActivate(): boolean {
    if (this.auth.isLoggedIn == LoginStatus.LOGGED_OUT) {
      this.router.navigate([RouterData["LOGIN"].url]).then();
    }
    return this.auth.isLoggedIn == LoginStatus.LOGGED_IN;
  }

}
