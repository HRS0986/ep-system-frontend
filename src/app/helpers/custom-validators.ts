import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
  public static matchPasswords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      return { passwordsNotMatch: true };
    } else {
      return null;
    }
  };

  public static conditionalRequired(condition: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = condition || control.value != null;
      return isValid ? { conditionalRequired: { value: control.value } } : null;
    };
  }
}
