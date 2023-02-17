import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { TokenStorageService } from "../../../services/token-storage.service";
import { UserService } from "../../../services/user.service";
import { HelperService } from "../../../services/helper.service";
import { ErrorMessages, Login, SnackBarStatus } from "../../../constants";
import { environment } from "../../../../environments/environment";
import { AuthRoutes } from "../../../route-data";
import { NgxSpinnerService } from "ngx-spinner";


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
      private userService: UserService,
      private spinner: NgxSpinnerService
  ) { }

  loginForm = this.formBuilder.group({
    email: this.formBuilder.control('', [Validators.required, Validators.email]),
    password: this.formBuilder.control('', [Validators.required])
  });

  PASSWORD: string = Login.PASSWORD_LABEL;
  EMAIL: string = Login.EMAIL_LABEl;
  LOGIN_BUTTON_TEXT: string = Login.LOGIN_BUTTON_TEXT;
  LOGIN_TITLE: string = Login.LOGIN_TITLE;
  VALIDATION_MESSAGES = ErrorMessages;

  LOGO_PATH = "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.jpg";

  isLoggedIn: boolean = false;
  isLoginFailed: boolean = false;
  hidePassword: boolean = true;
  isLoading: boolean = false;
  logo: string = `${window.location.protocol}//${window.location.host}/${environment.config.loginLogo}`;

  ngOnInit(): void {
  }

  getEmailErrorMessage(): string {
    if (this.loginForm.controls['email'].hasError('email')) {
      return this.VALIDATION_MESSAGES.EMAIL;
    }
    return this.VALIDATION_MESSAGES.required(this.EMAIL);
  }

  onSubmit() {
    this.spinner.show().then(() => {
      if (this.loginForm.valid) {
        this.isLoading = true;
        this.authenticationService.SignIn(this.loginForm.value.email, this.loginForm.value.password).then(result => {
          if (!result.status) {
            this.isLoginFailed = true;
            this.isLoading = false;
            if (result.data.code === "auth/wrong-password" || result.data.code === "auth/invalid-email") {
              this.spinner.hide().then(() => {
                this.isLoading = false;
                this.helperService.openSnackBar({text: Login.WRONG_CREDENTIALS_MESSAGE_TEXT, status: SnackBarStatus.FAILED});
              })
            }else{
              this.isLoading = false;
              this.helperService.openSnackBar({text: result.message, status: SnackBarStatus.FAILED});
            }
          }else{
            const firebaseUserId = JSON.parse(localStorage.getItem('user')!)['uid'];
            this.userService.GetAUser(firebaseUserId).subscribe(user => {
              localStorage.setItem('isFirstLogin', user.IsFirstLogin!.toString());
              this.isLoginFailed = false;
              this.isLoggedIn = true;
              this.isLoading = false;
              this.router.navigate([`${AuthRoutes.Root}/${AuthRoutes.SignUp}`]).then(() => {
                window.location.reload();
              });
            });
          }
        });
      }
    });
  }

}
