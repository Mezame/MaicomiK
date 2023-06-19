import { Injectable } from '@angular/core';
import { Comic } from '../comic';
import { ComicFormValue } from './comic-form-value';

@Injectable({
  providedIn: 'root',
})
export class ComicFormService {
  constructor() {
    /* Empty */
  }

  formatChapter(comicFormValue: Readonly<ComicFormValue>) {
    let chapter: number;
    let formatedComic: Comic;

    chapter = parseInt(comicFormValue.chapter!);
    formatedComic = { ...comicFormValue } as unknown as Comic;
    formatedComic.chapter = chapter;

    return formatedComic;
  }
}
