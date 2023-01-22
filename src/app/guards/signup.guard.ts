import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CustomerRoutes } from "../route-data";

@Injectable({
  providedIn: 'root'
})
export class SignupGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const isFirstLogin = !!JSON.parse(localStorage.getItem('isFirstLogin')!);

    if (!isFirstLogin) {
      this.router.navigate([`${CustomerRoutes.Root}/${CustomerRoutes.Ep.url}`]).then(() => { });
    }
    return isFirstLogin;
  }

}
