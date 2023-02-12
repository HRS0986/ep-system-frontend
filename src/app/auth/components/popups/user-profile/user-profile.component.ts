import { Component, OnInit } from '@angular/core';
import { Common, ErrorMessages, SignUp, SnackBarStatus, UserMessages } from "../../../../constants";
import { FormBuilder, Validators } from "@angular/forms";
import { User } from "../../../../types";
import { UserService } from "../../../../services/user.service";
import { HelperService } from "../../../../services/helper.service";
import { MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "../../../../services/auth.service";
import { Store } from "@ngrx/store";
import { AuthState } from "../../../store/auth.state";
import { AuthActions } from "../../../store/auth.actions";
import { authCurrentUserSelector } from "../../../store/auth.selectors";
import { filter } from "rxjs";
import { isTypeMatched } from "../../../../helpers/utils";
import { KEYS_OF_USER } from "../../../../types.keys";
import { CustomValidators } from "../../../../helpers/custom-validators";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(
      private formBuilder: FormBuilder,
      private userService: UserService,
      private authService: AuthService,
      private dialogRef: MatDialogRef<UserProfileComponent>,
      private helperService: HelperService,
      private store: Store<AuthState>
  ) {
  }

  selectedTabIndex = 0;
  BASIC_DATA_TAB = UserMessages.BASIC_DETAILS_TAB_TEXT;
  PASSWORD_TAB = UserMessages.CHANGE_PASSWORD_TAB_TEXT;
  CHANGE_PASSWORD_BUTTON_TEXT = SignUp.CHANGE_PASSWORD_TITLE;

  isSubmitted: boolean = false;
  isSubmittedBasicDataForm: boolean = false;
  hideCurrentPassword: boolean = true;
  hideNewPassword: boolean = true;
  hideConfirmPassword: boolean = true;
  isIncorrectOldPassword: boolean = false;
  user!: User

  TITLE: string = UserMessages.EDIT_USER_PROFILE_TITLE;
  CURRENT_PASSWORD: string = SignUp.CURRENT_PASSWORD_LABEL;
  NEW_PASSWORD: string = SignUp.NEW_PASSWORD_LABEL;
  CONFIRM_PASSWORD: string = SignUp.CONFIRM_PASSWORD_LABEL;
  STRONG_PASSWORD_ERROR: string = SignUp.STRONG_PASSWORD_MESSAGE_TEXT;
  CANCEL_BUTTON_TEXT = Common.CANCEL_BUTTON_TEXT;
  FIRST_NAME: string = UserMessages.FIRST_NAME_LABEL;
  LAST_NAME: string = UserMessages.LAST_NAME_LABEL;
  PHONE_NUMBER: string = UserMessages.PHONE_NUMBER_LABEL;
  SAVE_BUTTON_TEXT = Common.SAVE_BUTTON_TEXT;
  VALIDATION_MESSAGES = ErrorMessages;

  passwordForm = this.formBuilder.group({
    oldPassword: this.formBuilder.control('', [Validators.required]),
    newPassword: this.formBuilder.control('', [Validators.required, Validators.pattern(SignUp.STRONG_PASSWORD_REGEX)]),
    confirmPassword: this.formBuilder.control('', [Validators.required])
  }, { validators: CustomValidators.matchTwoFields('newPassword', 'confirmPassword') });

  basicDataForm = this.formBuilder.group({
    firstName: this.formBuilder.control('', [Validators.required]),
    lastName: this.formBuilder.control('', [Validators.required]),
    phone:this.formBuilder.control('', [Validators.required, Validators.pattern(UserMessages.PHONE_NUMBER_REGEX)]),
  });

  ngOnInit(): void {
    this.store.select(authCurrentUserSelector)
      .pipe(filter(user => isTypeMatched(user, KEYS_OF_USER)))
      .subscribe(userData => {
        this.user = userData;
        this.basicDataForm.patchValue({
          firstName: userData.FirstName,
          lastName: userData.LastName,
          phone: userData.PhoneNumber
        });
      });
    const loggedUserId = JSON.parse(localStorage.getItem('user')!)['uid'];
    this.store.dispatch(AuthActions.get_current_user({ id: loggedUserId }));
  }

  changeTitle(index: number) {
    if (index === 0) {
      this.selectedTabIndex = 0;
      this.TITLE = UserMessages.EDIT_USER_PROFILE_TITLE;
    } else {
      this.selectedTabIndex = 1;
      this.TITLE = this.CHANGE_PASSWORD_BUTTON_TEXT;
    }
  }

  onSaveClick(): void {
    this.isSubmittedBasicDataForm = true;
    if (this.basicDataForm.valid) {
      this.user.FirstName = this.basicDataForm.controls['firstName'].value;
      this.user.LastName = this.basicDataForm.controls['lastName'].value;
      this.user.PhoneNumber = this.basicDataForm.controls['phone'].value;
      this.userService.UpdateUserData(this.user).then(result => {
        if (result.status) {
          this.dialogRef.close();
          this.helperService.openSnackBar({
            text: result.message,
            status: SnackBarStatus.SUCCESS
          });
        } else {
          this.helperService.openSnackBar({
            text: result.message,
            status: SnackBarStatus.FAILED
          });
        }
      })
    } else {
      this.basicDataForm.markAllAsTouched();
    }
  }

  getNewPasswordErrorMessage() {
    if (this.passwordForm.controls['newPassword'].hasError('notMatch')) {
      return ErrorMessages.PASSWORDS_NOT_MATCHING;
    }
    return ErrorMessages.required(this.NEW_PASSWORD);
  }

  getConfirmPasswordErrorMessage() {
    if (this.passwordForm.controls['confirmPassword'].hasError('notMatch')) {
      return ErrorMessages.PASSWORDS_NOT_MATCHING;
    }
    return ErrorMessages.required(this.CONFIRM_PASSWORD);
  }

  onChangePassword() {
    this.isSubmitted = true;
    if (this.passwordForm.valid) {
      this.authService.ChangePassword(this.passwordForm.controls['oldPassword'].value, this.passwordForm.controls['newPassword'].value).then(result => {
        if (result.status) {
          this.helperService.openSnackBar({
            text: result.message,
            status: SnackBarStatus.SUCCESS
          });
          this.dialogRef.close();
        } else {
          if (result.data.code === 'auth/wrong-password') {
            this.isIncorrectOldPassword = true;
            this.passwordForm.get('oldPassword')!.setErrors({valid: false});
            this.passwordForm.markAllAsTouched();
          } else {
            this.isIncorrectOldPassword = false;
            this.helperService.openSnackBar({
              text: result.message,
              status: SnackBarStatus.FAILED
            });
          }
        }
      });
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }
}
