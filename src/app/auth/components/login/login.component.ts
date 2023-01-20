import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { TokenStorageService } from "../../../services/token-storage.service";
import { UserService } from "../../../services/user.service";
import { HelperService } from "../../../services/helper.service";
import { Login, SnackBarStatus } from "../../../constants";
import { environment } from "../../../../environments/environment";
import { AuthRoutes } from "../../../route-data";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
      private authenticationService: AuthService,
      private formBuilder: FormBuilder,
      private tokenStorageService: TokenStorageService,
      private router: Router,
      private helperService: HelperService,
      private userService: UserService
  ) { }

  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  PASSWORD: string = Login.PASSWORD_LABEL;
  EMAIL: string = Login.EMAIL_LABEl;
  LOGIN_BUTTON_TEXT: string = Login.LOGIN_BUTTON_TEXT;
  LOGIN_TITLE: string = Login.LOGIN_TITLE;

  isLoggedIn: boolean = false;
  isLoginFailed: boolean = false;
  hidePassword: boolean = true;
  isLoading: boolean = false;
  logo: string = `${window.location.protocol}//${window.location.host}/${environment.config.loginLogo}`;

  ngOnInit(): void {
  }

  onSubmit() {
    this.isLoading = true;
    if (this.loginForm.valid){
      this.authenticationService.SignIn(this.loginForm.value.email, this.loginForm.value.password).then(result => {
        if (!result.status) {
          this.isLoginFailed = true;
          this.isLoading = false;
          if (result.data.code === "auth/wrong-password" || result.data.code === "auth/invalid-email") {
            this.helperService.openSnackBar({text: Login.WRONG_CREDENTIALS_MESSAGE_TEXT, status: SnackBarStatus.FAILED});
          }else{
            this.helperService.openSnackBar({text: result.message, status: SnackBarStatus.FAILED});
          }
        }else{
          const firebaseUserId = JSON.parse(localStorage.getItem('user')!)['uid'];
          this.userService.GetAUser(firebaseUserId).subscribe(user => {
            localStorage.setItem('isFirstLogin', user.IsFirstLogin!.toString());
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.isLoading = false;
            this.router.navigate([AuthRoutes.SignUp]).then(() => {
              window.location.reload();
            });
          });
        }
      });
    }
  }

}
