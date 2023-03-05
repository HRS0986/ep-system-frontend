import { Component, OnInit } from '@angular/core';
import { AuthMessages, Common, ErrorMessages, SnackBarStatus, UserManagementMessages } from "../../../../constants";
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

  VALIDATION_MESSAGES = ErrorMessages;
  USER_MESSAGES = UserManagementMessages;
  AUTH_MESSAGES = AuthMessages;
  COMMON_MESSAGES = Common;

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
        window.location.reload();
        this.helperService.openSnackBar({
          text: UserManagementMessages.USER_ADDED_SUCCESSFULLY_MESSAGE_TEXT,
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
      return ErrorMessages.PASSWORDS_NOT_MATCHING;
    }
    return ErrorMessages.required(this.USER_MESSAGES.PASSWORD_LABEL);
  }

  getConfirmPasswordErrorMessage() {
    if (this.userForm.controls['confirmPassword'].hasError('notMatch')) {
      return ErrorMessages.PASSWORDS_NOT_MATCHING;
    }
    return ErrorMessages.required(this.AUTH_MESSAGES.CONFIRM_PASSWORD_LABEL);
  }

}
