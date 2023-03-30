import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { catchError, EMPTY, map, mergeMap, of, switchMap } from 'rxjs';
import { ComicsService } from '../comics.service';
import {
  addComicAction,
  editComicAction,
  ComicsApiActions,
  incrementComicChapterAction,
  loadComicsAction,
  deleteComicAction,
} from './comics.actions';
import { selectComics } from './comics.selectors';

@Injectable()
export class ComicEffects {
  loadComics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadComicsAction),
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
      ofType(addComicAction),
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
      ofType(editComicAction),
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

  patchComic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(incrementComicChapterAction),
      switchMap((action) => {
        return this.comicsService.patchComic(action.comic, action.fields).pipe(
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

  deleteComic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteComicAction),
      switchMap((action) => {
        return this.comicsService.deleteComic(action.id).pipe(
          map((res) => {
            if (res.error) {
              throw new Error('comics api failure');
            }

            return ComicsApiActions.deletedComic({ id: res.id! });
          }),
          catchError(() => of({ type: '[Comics API] Delete Comic Failure' }))
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
