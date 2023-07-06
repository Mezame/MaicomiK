import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  EMPTY,
  catchError,
  exhaustMap,
  map,
  mergeMap,
  of,
  switchMap,
} from 'rxjs';
import { ComicDataService } from '../services/comic-data.service';
import {
  ComicsApiActions,
  addComicAction,
  deleteComicAction,
  editComicAction,
  incrementComicChapterAction,
  loadComicsAction,
} from './comics.actions';
import { selectComics } from './comics.selectors';

@Injectable()
export class ComicEffects {
  loadComics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        loadComicsAction,
        '[Comic Detail Page] Load Comics',
        '[Add Comic Page] Load Comics',
        '[Edit Comic Page] Load Comics',
        '[Add Comic Readers Page] Load Comics',
        '[Edit Comic Readers Page] Load Comics',
        '[Add Comic Notes Page] Load Comics',
        '[Edit Comic Notes Page] Load Comics'
      ),
      concatLatestFrom(() => this.store.select(selectComics)),
      mergeMap(([_, comics]) => {
        if (comics?.length > 0) {
          return EMPTY;
        }

        return this.comicDataService
          .getComics()
          .pipe(map((comics) => ComicsApiActions.gotComics({ comics })));
      })
    )
  );

  reloadComics$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Comic List Page] Reload Comics'),
      exhaustMap(() => {
        return this.comicDataService
          .getComics()
          .pipe(map((comics) => ComicsApiActions.gotComics({ comics })));
      })
    )
  );

  addComic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addComicAction),
      switchMap((action) => {
        const comic = action.comic;

        return this.comicDataService.addComic(comic).pipe(
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
      ofType(
        editComicAction,
        '[Add Comic Readers Page] Update Comic',
        '[Edit Comic Readers Page] Update Comic',
        '[Add Comic Notes Page] Update Comic',
        '[Edit Comic Notes Page] Update Comic'
      ),
      switchMap((action) => {
        const comic = action.comic;

        return this.comicDataService.updateComic(comic).pipe(
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
      ofType(
        incrementComicChapterAction,
        '[Comic List Page] Increment Comic Chapter',
        '[Comic Detail Page] Delete Comic Readers',
        '[Comic Detail Page] Delete Comic Notes'
      ),
      switchMap((action) => {
        const comic = action.comic;
        const fields = action.fields;

        return this.comicDataService.patchComic(comic, fields).pipe(
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
        const id = action.id;

        return this.comicDataService.deleteComic(id).pipe(
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
    private comicDataService: ComicDataService,
    private store: Store
  ) {}
}
