import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function comicChapterValidator(): ValidatorFn {
  let validator: (control: AbstractControl) => ValidationErrors | null;

  validator = (control) => {
    const comicChapter = control.value;

    if (!comicChapter) {
      return null;
    }

    const regEx =
    /^(0|[1-9]\d*)(\.\d+)?$/;

    const comicChapterValid = regEx.test(comicChapter.trim());

    return comicChapterValid ? null : { comicChapter: true };
  };

  return validator;
}