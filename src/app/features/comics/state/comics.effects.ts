import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { ComicsDataService } from '../services/comics-data.service';
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
        '[Comic Edit Page] Load Comics',
        '[Comic Readers Add Page] Load Comics',
        '[Comic Readers Edit Page] Load Comics',
        '[Comic Notes Add Page] Load Comics',
        '[Comic Notes Edit Page] Load Comics'
      ),
      concatLatestFrom(() => this.store.select(selectComics)),
      mergeMap(([_, comics]) => {
        if (comics?.length > 0) {
          return EMPTY;
        }

        return this.comicsDataService
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

        return this.comicsDataService.addComic(comic).pipe(
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
        '[Comic Readers Add Page] Update Comic',
        '[Comic Readers Edit Page] Update Comic',
        '[Comic Notes Add Page] Update Comic',
        '[Comic Notes Edit Page] Update Comic'
      ),
      switchMap((action) => {
        const comic = action.comic;

        return this.comicsDataService.updateComic(comic).pipe(
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

        return this.comicsDataService.patchComic(comic, fields).pipe(
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

        return this.comicsDataService.deleteComic(id).pipe(
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
    private comicsDataService: ComicsDataService,
    private store: Store
  ) {}
}
