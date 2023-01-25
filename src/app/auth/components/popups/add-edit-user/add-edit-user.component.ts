import { Component, OnInit } from '@angular/core';
import { Common, SignUp, SnackBarStatus, UserManagement, UserMessages } from "../../../../constants";
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators } from "@angular/forms";
import { HelperService } from "../../../../services/helper.service";
import { matchPasswords } from "../../../../helpers/app.validators";
import { AuthService } from "../../../../services/auth.service";

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
  REQUIRED_FIELD_ERROR_TEXT = Common.REQUIRED_FIELD_MESSAGE_TEXT;
  INVALID_EMAIL_ERROR = UserMessages.INVALID_EMAIL_MESSAGE_TEXT;
  PASSWORDS_NOT_MATCH_ERROR = SignUp.PASSWORD_MISMATCH_MESSAGE_TEXT;

  isSubmitted = false;
  isError = false;
  isInvalidEmail = false;
  hideNewPassword: boolean = true;
  hideConfirmPassword: boolean = true;

  userForm = this.formBuilder.group({
    email: this.formBuilder.control('', [Validators.required]),
    newPassword: this.formBuilder.control('', [Validators.required]),
    confirmPassword: this.formBuilder.control('', [Validators.required])
  }, {validators: matchPasswords});

  ngOnInit(): void {
    const strongPassword = this.helperService.generateStrongPassword()
    this.userForm.patchValue({
      email: '',
      newPassword: strongPassword,
      confirmPassword: strongPassword
    });
  }

  onClickSave() {
    this.isSubmitted = true;
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
      this.isInvalidEmail = this.userForm.controls['email'].errors!['email'];
      if (this.userForm.errors?.['passwordsNotMatch']) {
        this.userForm.get('confirmPassword')!.setErrors({valid: false});
      }
      this.userForm.markAllAsTouched();
      if (!this.isInvalidEmail) {
        this.isError = true;
      }
    }
  }

}
