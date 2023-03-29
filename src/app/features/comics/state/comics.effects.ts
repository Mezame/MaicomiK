import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { catchError, EMPTY, map, mergeMap, of, switchMap } from 'rxjs';
import { ComicsService } from '../comics.service';
import {
  ComicAddAction,
  ComicEditAction,
  ComicsApiActions,
  LoadComicsAction,
} from './comics.actions';
import { selectComics } from './comics.selectors';

@Injectable()
export class ComicEffects {
  loadComics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadComicsAction),
      concatLatestFrom(() => this.store.select(selectComics)),
      mergeMap(([_, comics]) => {
        if (comics?.length > 0) {
          return EMPTY;
        }

        return this.comicsService
          .getComics()
          .pipe(
            map((comics) => ComicsApiActions.retrievedComicList({ comics }))
          );
      })
    )
  );

  addComic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ComicAddAction),
      switchMap((action) => {
        return this.comicsService.addComic(action.comic).pipe(
          map((res) => {
            if (res.error) {
              throw new Error('comics api failure');
            }

            return ComicsApiActions.addedComic({ comic: res.document });
          }),
          catchError(() => of({ type: '[Comics API] Add Comic Failure' }))
        );
      })
    )
  );

  updateComic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ComicEditAction),
      switchMap((action) => {
        return this.comicsService.updateComic(action.comic).pipe(
          map((res) => {
            if (res.error) {
              throw new Error('comics api failure');
            }

            return ComicsApiActions.updatedComic({ comic: res.document });
          }),
          catchError(() => of({ type: '[Comics API] Update Comic Failure' }))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private comicsService: ComicsService,
    private store: Store
  ) {}
}
