import { Injectable } from '@angular/core';
import { AuthMessages, LoginStatus } from "../constants";

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  // Get login status from Session Storage
  public getLoginStatus(): LoginStatus {
    const status = !!sessionStorage.getItem(AuthMessages.LOGIN_TOKEN);
    if (status) {
      return LoginStatus.LOGGED_IN;
    } else {
      return LoginStatus.LOGGED_OUT;
    }
  }

  // Save login status in Session Storage
  public setLoginStatus(status: LoginStatus) {
    if (status === LoginStatus.LOGGED_IN) {
      sessionStorage.setItem(AuthMessages.LOGIN_TOKEN, 'true');
    } else {
      sessionStorage.removeItem(AuthMessages.LOGIN_TOKEN);
    }
  }
}
