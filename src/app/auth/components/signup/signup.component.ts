import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { UserService } from "../../../services/user.service";
import { AuthService } from "../../../services/auth.service";
import { HelperService } from "../../../services/helper.service";
import { MatTooltip } from "@angular/material/tooltip";
import { Login, NewCustomer, SignUp, SnackBarStatus, UserManagement, UserMessages } from "../../../constants";
import { matchPasswords } from "../../../helpers/app.validators";
import { User } from "../../../types";
import { environment } from "../../../../environments/environment";
import { CustomerRoutes } from "../../../route-data";

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
      private formBuilder: FormBuilder,
      private userService: UserService,
      private authService: AuthService,
      private router: Router,
      private helperService: HelperService
  ) { }

  @ViewChild('npTooltip') npTooltip!: MatTooltip;

  signupForm = this.formBuilder.group({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    contactNo: new FormControl('', [Validators.required, Validators.pattern(UserMessages.PHONE_NUMBER_REGEX)]),
  });

  passwordForm = this.formBuilder.group({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.pattern(SignUp.STRONG_PASSWORD_REGEX)]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, { validators: matchPasswords });

  isSubmitted: boolean = false;
  hideCurrentPassword: boolean = true;
  hideNewPassword: boolean = true;
  hideConfirmPassword: boolean = true;
  isSecondStep: boolean = false;
  isLoading: boolean = false;
  user!: User;
  logo: string = `${window.location.protocol}//${window.location.host}/${environment.config.loginLogo}`;

  TITLE: string = SignUp.SIGN_UP_TITLE;
  FIRST_NAME: string = SignUp.FIRST_NAME_LABEL;
  LAST_NAME: string = SignUp.LAST_NAME_LABEL;
  CURRENT_PASSWORD: string = SignUp.CURRENT_PASSWORD_LABEL;
  NEW_PASSWORD: string = SignUp.NEW_PASSWORD_LABEL;
  CONFIRM_PASSWORD: string = SignUp.CONFIRM_PASSWORD_LABEL;
  SIGN_UP_BUTTON_TEXT: string = SignUp.SIGN_UP_BUTTON_TEXT;
  PASSWORD_MISMATCH_ERROR: string = SignUp.PASSWORD_MISMATCH_MESSAGE_TEXT;
  STRONG_PASSWORD_ERROR: string = SignUp.STRONG_PASSWORD_MESSAGE_TEXT;
  CONTACT_NUMBER: string = UserManagement.CONTACT_NUMBER_LABEL;
  INVALID_CONTACT_NUMBER_ERROR: string = UserMessages.INVALID_CONTACT_NUMBER_MESSAGE_TEXT;
  NEXT = NewCustomer.NEXT_BUTTON_TEXT;
  PREVIOUS = NewCustomer.PREVIOUS_BUTTON_TEXT;

  ngOnInit(): void {
  }

  onSubmit() {
    this.isLoading = true;
    this.isSubmitted = true;
    if (this.passwordForm.valid) {
      this.authService.ChangePassword(this.passwordForm.controls['currentPassword'].value, this.passwordForm.controls['newPassword'].value).then(result => {
        if (result.status) {
          this.userService.UpdateUserData(this.user).then(result => {
            if (result.status) {
              this.router.navigate([CustomerRoutes.Ep.url]).then(() => {
                this.isLoading = false;
                window.location.reload();
                this.helperService.openSnackBar({text:result.message, status: SnackBarStatus.SUCCESS});
              });
            } else {
              this.isLoading = false;
              this.helperService.openSnackBar({text:result.message, status: SnackBarStatus.FAILED});
            }
          });
        } else {
          if (result.data.code === "auth/wrong-password") {
            this.helperService.openSnackBar({text:Login.WRONG_PASSWORD_MESSAGE_TEXT, status: SnackBarStatus.FAILED});
          } else {
            this.helperService.openSnackBar({text:result.message, status: SnackBarStatus.FAILED});
          }
        }
      });
    } else {
      this.passwordForm.markAllAsTouched();
      if (this.passwordForm.controls['newPassword'].errors!['pattern'] != null) {
        this.npTooltip.show();
      }else{
        this.passwordForm.get('confirmPassword')!.setErrors({valid:false});
      }
    }
  }

  onClickNext() {
    if (this.signupForm.valid) {
      this.isSecondStep = true;
      this.user = {
        UID: JSON.parse(localStorage.getItem('user')!)['uid'],
        FirstName : this.signupForm.controls['firstName'].value,
        LastName : this.signupForm.controls['lastName'].value,
        PhoneNumber : this.signupForm.controls['contactNo'].value,
        IsFirstLogin : false,
        IsActive : true,
      }
      this.TITLE = SignUp.CHANGE_PASSWORD_TITLE;
    }
  }

  get contactNoError() {
    if (this.signupForm.controls['contactNo'].errors){
      return this.signupForm.controls['contactNo'].errors!['pattern'];
    }
    return false
  }

}
