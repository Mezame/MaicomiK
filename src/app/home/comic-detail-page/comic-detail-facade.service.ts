import { Injectable } from '@angular/core';
import { ApiState } from '@core/app-store';
import { AppStore } from '@core/app-store.service';
import { Comic } from '@features/comics/models';
import {
  deleteComicAction,
  incrementComicChapterAction,
  selectComic,
} from '@features/comics/state';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';
import { ComicDetailServices } from './comic-detail';

@Injectable({
  providedIn: 'root',
})
export class ComicDetailFacadeService implements ComicDetailServices {
  constructor(private appStore: AppStore, private store: Store) {}

  clearApiState(): void {
    this.appStore.clearApiState();
  }

  deleteComic(comicId: string): void {
    this.store.dispatch(deleteComicAction({ id: comicId }));
  }

  deleteComicNotes(comic: Readonly<Comic>, comicFields: Partial<Comic>): void {
    this.store.dispatch({
      type: '[Comic Detail Page] Delete Comic Notes',
      comic,
      fields: comicFields,
    });
  }

  deleteComicReaders(
    comic: Readonly<Comic>,
    comicFields: Partial<Comic>
  ): void {
    this.store.dispatch({
      type: '[Comic Detail Page] Delete Comic Readers',
      comic,
      fields: comicFields,
    });
  }

  getApiState(): Observable<ApiState> {
    const apiState = this.appStore.getApiState().pipe(take(1));

    return apiState;
  }

  getComic(comicUrlSegment: string): Observable<Readonly<Comic>> {
    const comic$ = this.store.select(selectComic(comicUrlSegment)).pipe(
      map((comic) => {
        if (!comic) {
          this.loadComics();

          return {} as unknown as Readonly<Comic>;
        }

        return comic;
      })
    );

    return comic$;
  }

  incrementComicChapter(
    comic: Readonly<Comic>,
    comicFields: Partial<Comic>
  ): void {
    this.store.dispatch(
      incrementComicChapterAction({ comic, fields: comicFields })
    );
  }

  loadComics(): void {
    this.store.dispatch({ type: '[Comic Detail Page] Load Comics' });
  }
}
