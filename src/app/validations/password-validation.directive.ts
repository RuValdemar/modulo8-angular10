import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export function passwordValidation(): ValidatorFn {
  return (control: AbstractControl) => {
    const passwordValidationDirective = new PasswordValidationDirective();
    return passwordValidationDirective.validate(control);
  }
}


@Directive({
  selector: '[appPasswordValidation]',
  providers: [{provide: NG_VALIDATORS, useExisting: PasswordValidationDirective, multi: true}]
})
export class PasswordValidationDirective implements Validator {

  passwordsProhibidos = ['123456', 'querty', '123456789'];

  constructor() { }

  validate(control: import('@angular/forms').AbstractControl): import('@angular/forms').ValidationErrors {

    const password = control.value as string;
    if (!password) { return; }
    if (password.length < 4) { return; }

    if (this.passwordsProhibidos.indexOf(password) !== -1) {
      return {passwordValidation: {message: 'Escoge un mejor password'}};
    }

    if (password === password.toLowerCase()) {
      return {passwordValidation: {message: 'Tu password debe de contener mayúsculas'}};
    }

    if (password === password.toUpperCase()) {
      return {passwordValidation: {message: 'Tu password debe de contener minúsculas'}};
    }

    if (!/\d/.test(password)) {
      return {passwordValidation: {message: 'Tu password debe de incluir un caracter numérico'}};
    }

    return null;
  }


}
