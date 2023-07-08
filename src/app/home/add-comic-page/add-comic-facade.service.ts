import { Injectable } from '@angular/core';
import { ApiState } from '@core/app-store';
import { AppStore } from '@core/app-store.service';
import { Comic, ComicFormValue } from '@features/comics/models';
import { ComicFormService } from '@features/comics/services/comic-form.service';
import { addComicAction } from '@features/comics/state';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { AddComicServices } from './add-comic';

@Injectable({
  providedIn: 'root',
})
export class AddComicFacadeService implements AddComicServices {
  constructor(
    private appStore: AppStore,
    private comicFormService: ComicFormService,
    private store: Store
  ) {}

  addComic(comic: Partial<Comic>): void {
    this.store.dispatch(addComicAction({ comic }));
  }

  clearApiState(): void {
    this.appStore.clearApiState();
  }

  formatComicChapter(comicFormValue: ComicFormValue): Comic {
    const comic = this.comicFormService.formatChapter(comicFormValue);

    return comic;
  }

  getApiState(): Observable<ApiState> {
    const apiState = this.appStore.getApiState().pipe(take(1));

    return apiState;
  }

  loadComics(): void {
    this.store.dispatch({ type: '[Add Comic Page] Load Comics' });
  }
}
