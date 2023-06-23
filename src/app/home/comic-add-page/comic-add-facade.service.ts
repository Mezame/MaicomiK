import { Injectable } from '@angular/core';
import { Comic } from '@features/comics/comic';
import { ComicFormValue } from '@features/comics/comic-add-edit-form/comic-form';
import { ComicFormService } from '@features/comics/comic-add-edit-form/comic-form.service';
import {
  ApiState,
  ComicsStoreService,
} from '@features/comics/comics-store.service';
import { addComicAction } from '@features/comics/state/comics.actions';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComicAddFacadeService {
  constructor(
    private comicFormService: ComicFormService,
    private comicsStoreService: ComicsStoreService,
    private store: Store
  ) {}

  addComic(comic: Partial<Comic>): void {
    this.store.dispatch(addComicAction({ comic }));
  }

  clearApiState(): void {
    this.comicsStoreService.clearApiState();
  }

  formatComicChapter(comicFormValue: ComicFormValue): Comic {
    return this.comicFormService.formatChapter(comicFormValue);
  }

  getApiState(): Observable<ApiState | null> {
    return this.comicsStoreService.getApiState().pipe(take(1));
  }
}
