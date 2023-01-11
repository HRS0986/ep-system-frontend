import { FormGroup } from "@angular/forms";

export function matchPasswords(fg: FormGroup) {
  let password: any = fg.get('newPassword');
  let passwordConfirm: any = fg.get('confirmPassword');
  if (password.value !== passwordConfirm.value) {
    return {
      passwordsNotMatch: true
    };
  }
  return null;
}
