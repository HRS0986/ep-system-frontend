import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
  public static matchTwoFields(firstField: string, secondField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const firstValue = control.get(firstField);
      const secondValue = control.get(secondField);
      if (firstValue?.value !== "" && secondValue?.value !== "") {
        if (firstValue!.value !== secondValue!.value) {
          firstValue?.setErrors({ notMatch: true });
          secondValue?.setErrors({ notMatch: true });
          return { fieldsNotMatch: true };
        } else {
          firstValue?.markAsUntouched();
          secondValue?.markAsUntouched();
          return null;
        }
      } else {
        debugger
        firstValue?.markAsUntouched();
        secondValue?.markAsUntouched();
        return null;
      }
    }
  };

  public static conditionalRequired(condition: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = condition || control.value != null;
      return isValid ? { conditionalRequired: { value: control.value } } : null;
    };
  }

  public static minEqualDate(dateControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const secondFormDate = new Date(control.value);
      const firstFormDate = new Date(dateControl.value);
      return secondFormDate >= firstFormDate ? null : { minDate: true };
    };
  }
}
