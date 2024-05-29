import {
  AbstractControl,
  Validators,
  FormControl,
} from '@angular/forms';

export function LetterValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  if (!control.value) return null;

  const reg = new RegExp('^[a-zA-Z]+[0-9]*$');

  return reg.test(control.value) ? null : { invalidSymbols: true };
}
export function EmailValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  if (!control.value) return null;

  const emailReg = new RegExp('^[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]{2,4}$');
  return emailReg.test(control.value) ? null : { invalidEmail: true };
}

export function passwordCharactersValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  if (!control.value) return null;

  const reg = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$');

  return reg.test(control.value) ? null : { invalidPassword: true };
}


const userControl = new FormControl(
  '',
  Validators.compose([EmailValidator, LetterValidator])
);