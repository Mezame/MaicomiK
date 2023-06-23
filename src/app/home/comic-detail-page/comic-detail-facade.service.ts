import { Injectable } from '@angular/core';
import { Comic } from '@features/comics/comic';
import {
  ApiState,
  ComicsStoreService,
} from '@features/comics/comics-store.service';
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
  constructor(
    private comicsStoreService: ComicsStoreService,
    private store: Store
  ) {}

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
    const apiState = this.comicsStoreService.getApiState().pipe(take(1));

    return apiState;
  }

  getComic(comicUrlSegment: string): Observable<Readonly<Comic>> {
    const comic$ = this.store.select(selectComic(comicUrlSegment)).pipe(
      map((comic) => {
        if (!comic) {
          this.store.dispatch({ type: '[Comic Detail Page] Load Comics' });

          return {} as Readonly<Comic>;
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
}
