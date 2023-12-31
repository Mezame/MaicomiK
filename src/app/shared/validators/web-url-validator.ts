import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function webUrlValidator(): ValidatorFn {
  let validator: (control: AbstractControl) => ValidationErrors | null;

  validator = (control) => {
    const webUrl = control.value;

    if (!webUrl) {
      return null;
    }

    const regEx =
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/gm;

    const isWebUrlValid = regEx.test(webUrl.trim());

    return isWebUrlValid ? null : { webUrl: true };
  };

  return validator;
}
