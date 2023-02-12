import { Component, OnInit } from '@angular/core';
import { Common, ErrorMessages, SignUp, SnackBarStatus, UserManagement } from "../../../../constants";
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators } from "@angular/forms";
import { HelperService } from "../../../../services/helper.service";
import { AuthService } from "../../../../services/auth.service";
import { CustomValidators } from "../../../../helpers/custom-validators";

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {
  constructor(
      private authService: AuthService,
      private dialogRef: MatDialogRef<AddEditUserComponent>,
      private formBuilder: FormBuilder,
      private helperService: HelperService
  ) {
  }

  ADD_NEW_USER = UserManagement.ADD_NEW_USER;
  PASSWORD = UserManagement.PASSWORD_LABEL;
  CONFIRM_PASSWORD = SignUp.CONFIRM_PASSWORD_LABEL;
  EMAIL = UserManagement.EMAIL_LABEL;
  CANCEL_BUTTON_TEXT = Common.CANCEL_BUTTON_TEXT;
  SAVE_BUTTON_TEXT = Common.SAVE_BUTTON_TEXT;
  VALIDATION_MESSAGES = ErrorMessages;

  hideNewPassword: boolean = true;
  hideConfirmPassword: boolean = true;

  userForm = this.formBuilder.group({
    email: this.formBuilder.control('', [Validators.required, Validators.email]),
    newPassword: this.formBuilder.control('', [Validators.required]),
    confirmPassword: this.formBuilder.control('', [Validators.required])
  }, { validators: CustomValidators.matchTwoFields('newPassword', 'confirmPassword') });

  ngOnInit(): void {
    const strongPassword = this.helperService.generateStrongPassword()
    this.userForm.patchValue({
      email: '',
      newPassword: strongPassword,
      confirmPassword: strongPassword
    });
  }

  onClickSave() {
    if (this.userForm.valid) {
      this.authService.SignUp(this.userForm.controls['email'].value, this.userForm.controls['newPassword'].value).then(() => {
        this.dialogRef.close();
        this.helperService.openSnackBar({
          text: UserManagement.USER_ADDED_SUCCESSFULLY_MESSAGE_TEXT,
          status: SnackBarStatus.SUCCESS
        });
      }).catch(err => {
        this.helperService.openSnackBar({
          text: err.message,
          status: SnackBarStatus.FAILED
        });
      })
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  getNewPasswordErrorMessage() {
    if (this.userForm.controls['newPassword'].hasError('notMatch')) {
      return ErrorMessages.passwordsNotMatching();
    }
    return ErrorMessages.required(this.PASSWORD);
  }

  getConfirmPasswordErrorMessage() {
    if (this.userForm.controls['confirmPassword'].hasError('notMatch')) {
      return ErrorMessages.passwordsNotMatching();
    }
    return ErrorMessages.required(this.CONFIRM_PASSWORD);
  }

}
