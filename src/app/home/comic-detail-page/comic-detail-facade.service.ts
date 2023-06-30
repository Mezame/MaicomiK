import { Injectable } from '@angular/core';
import { ApiState, AppStoreService } from '@core/services/app-store.service';
import { Comic } from '@features/comics/models';
import {
  deleteComicAction,
  incrementComicChapterAction,
  selectComic,
} from '@features/comics/state';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComicDetailFacadeService {
  constructor(private appStoreService: AppStoreService, private store: Store) {}

  clearApiState(): void {
    this.appStoreService.clearApiState();
  }

  deleteComic(comicId: string): void {
    this.store.dispatch(deleteComicAction({ id: comicId }));
  }

  deleteComicNotes(comic: Readonly<Comic>, comicFields: Partial<Comic>) {
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

  getApiState(): Observable<ApiState | null> {
    const apiState = this.appStoreService.getApiState().pipe(take(1));

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
