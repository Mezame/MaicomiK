import { FormControl, FormGroup } from '@angular/forms';
import { ComicFormat, ComicStatus } from '../comic';

export type ComicForm = FormGroup<{
  title: FormControl<ComicFormValue['title']>;
  format: FormControl<ComicFormValue['format']>;
  status: FormControl<ComicFormValue['status']>;
  chapter: FormControl<ComicFormValue['chapter']>;
  coverUrl: FormControl<ComicFormValue['coverUrl']>;
}>;

export interface ComicFormValue {
  title: string | null;
  format: ComicFormat | null;
  status: ComicStatus | null;
  chapter: string | null;
  coverUrl: string | null;
}
