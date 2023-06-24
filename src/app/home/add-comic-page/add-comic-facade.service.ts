import { Injectable } from '@angular/core';
import { Comic, ComicFormValue } from '@features/comics/models';
import { ComicFormService } from '@features/comics/services/comic-form.service';
import {
  ApiState,
  ComicsStoreService,
} from '@features/comics/services/comics-store.service';
import { addComicAction } from '@features/comics/state';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddComicFacadeService {
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
    const comic = this.comicFormService.formatChapter(comicFormValue);

    return comic;
  }

  getApiState(): Observable<ApiState | null> {
    const apiState = this.comicsStoreService.getApiState().pipe(take(1));

    return apiState;
  }
}
