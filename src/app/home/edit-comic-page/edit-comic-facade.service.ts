import { Injectable } from '@angular/core';
import { ApiState, AppStore } from '@core/services/app-store.service';
import { Comic } from '@features/comics/models';
import { ComicFormValue } from '@features/comics/models/comic-form';
import { ComicFormService } from '@features/comics/services/comic-form.service';
import { editComicAction, selectComic } from '@features/comics/state';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditComicFacadeService {
  constructor(
    private appStore: AppStore,
    private comicFormService: ComicFormService,
    private store: Store
  ) {}

  clearApiState(): void {
    this.appStore.clearApiState();
  }

  editComic(editedComic: Readonly<Comic>): void {
    this.store.dispatch(editComicAction({ comic: editedComic }));
  }

  formatComicChapter(comicFormValue: ComicFormValue): Comic {
    const comic = this.comicFormService.formatChapter(comicFormValue);

    return comic;
  }

  getApiState(): Observable<ApiState | null> {
    const apiState = this.appStore.getApiState().pipe(take(1));

    return apiState;
  }

  getComic(comicUrlSegment: string): Observable<Readonly<Comic>> {
    const comic$ = this.store.select(selectComic(comicUrlSegment)).pipe(
      map((comic) => {
        if (!comic) {
          this.loadComics();

          return null as unknown as Readonly<Comic>;
        }

        return comic;
      })
    );

    return comic$;
  }

  loadComics(): void {
    this.store.dispatch({ type: '[Edit Comic Page] Load Comics' });
  }
}
