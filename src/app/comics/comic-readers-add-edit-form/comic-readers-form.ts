import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type ComicReadersForm = FormGroup<{
  name: FormControl<ComicReadersFormValue['name']>;
  url: FormControl<ComicReadersFormValue['url']>;
}>;

export type ComicReadersFormArray = FormArray<ComicReadersForm>;

export interface ComicReadersFormValue {
  name: string | null;
  url: string | null;
}
