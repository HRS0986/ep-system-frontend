import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { UserService } from "../../../services/user.service";
import { AuthService } from "../../../services/auth.service";
import { HelperService } from "../../../services/helper.service";
import { MatTooltip } from "@angular/material/tooltip";
import {
  AuthMessages,
  ErrorMessages,
  NewCustomer,
  SnackBarStatus,
  UserManagementMessages,
  UserMessages
} from "../../../constants";
import { User } from "../../../types";
import { environment } from "../../../../environments/environment";
import { CustomerRoutes } from "../../../route-data";
import { CustomValidators } from "../../../helpers/custom-validators";

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @ViewChild('npTooltip') npTooltip!: MatTooltip;
  signupForm = this.formBuilder.group({
    firstName: this.formBuilder.control('', [Validators.required]),
    lastName: this.formBuilder.control('', [Validators.required]),
    contactNo: this.formBuilder.control('', [Validators.required, Validators.pattern(UserMessages.PHONE_NUMBER_REGEX)]),
  });
  passwordForm = this.formBuilder.group({
    currentPassword: this.formBuilder.control('', [Validators.required]),
    newPassword: this.formBuilder.control('', [Validators.required, Validators.pattern(AuthMessages.STRONG_PASSWORD_REGEX)]),
    confirmPassword: this.formBuilder.control('', [Validators.required]),
  }, { validators: CustomValidators.matchTwoFields('newPassword', 'confirmPassword') });

  isSubmitted: boolean = false;
  hideCurrentPassword: boolean = true;
  hideNewPassword: boolean = true;
  hideConfirmPassword: boolean = true;
  isSecondStep: boolean = false;
  isLoading: boolean = false;
  isIncorrectOldPassword = false;
  user!: User;
  logo: string = `${window.location.protocol}//${window.location.host}/${environment.config.loginLogo}`;
  title: string = AuthMessages.SIGN_UP_TITLE;

  LOGO_PATH = "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.jpg";

  CONTACT_NUMBER: string = UserManagementMessages.CONTACT_NUMBER_LABEL;
  VALIDATION_MESSAGES = ErrorMessages;
  AUTH_MESSAGES = AuthMessages;
  CUSTOMER_MESSAGES = NewCustomer;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private helperService: HelperService
  ) {
  }

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
              this.router.navigate([CustomerRoutes.Root, CustomerRoutes.Ep.url]).then(() => {
                this.isLoading = false;
                window.location.reload();
                this.helperService.openSnackBar({
                  text: result.message,
                  status: SnackBarStatus.SUCCESS
                });
              });
            } else {
              this.isLoading = false;
              this.helperService.openSnackBar({ text: result.message, status: SnackBarStatus.FAILED });
            }
          });
        } else {
          if (result.data.code === "auth/wrong-password") {
            this.isIncorrectOldPassword = true;
            this.helperService.openSnackBar({
              text: AuthMessages.WRONG_PASSWORD_MESSAGE_TEXT,
              status: SnackBarStatus.FAILED
            });
          } else {
            this.helperService.openSnackBar({ text: result.message, status: SnackBarStatus.FAILED });
          }
        }
      });
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }

  onClickNext() {
    if (this.signupForm.valid) {
      this.isSecondStep = true;
      this.user = {
        UID: JSON.parse(localStorage.getItem('user')!)['uid'],
        FirstName: this.signupForm.controls['firstName'].value,
        LastName: this.signupForm.controls['lastName'].value,
        PhoneNumber: this.signupForm.controls['contactNo'].value,
        IsFirstLogin: false,
        IsActive: true,
      }
      this.title = AuthMessages.CHANGE_PASSWORD_TITLE;
    }
  }

  getContactNoErrorMessage() {
    if (this.signupForm.controls['contactNo'].hasError('pattern')) {
      return this.VALIDATION_MESSAGES.TELEPHONE;
    }
    return this.VALIDATION_MESSAGES.required(this.CONTACT_NUMBER);
  }

  getNewPasswordErrorMessage() {
    if (this.passwordForm.controls['newPassword'].hasError('notMatch')) {
      return ErrorMessages.PASSWORDS_NOT_MATCHING;
    }
    return ErrorMessages.required(this.AUTH_MESSAGES.NEW_PASSWORD_LABEL);
  }

  getConfirmPasswordErrorMessage() {
    if (this.passwordForm.controls['confirmPassword'].hasError('notMatch')) {
      return ErrorMessages.PASSWORDS_NOT_MATCHING;
    }
    return ErrorMessages.required(this.AUTH_MESSAGES.CONFIRM_PASSWORD_LABEL);
  }

}
