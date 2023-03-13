import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';
import { ComicsService } from '../comics.service';
import { ComicsApiActions } from './comics.actions';

@Injectable()
export class ComicEffects {
  loadComics$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Comic List Page] Load Comics'),
      exhaustMap(() =>
        this.comicsService.getComics().pipe(
          map((comics) => ComicsApiActions.retrievedComicList({ comics })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private comicsService: ComicsService
  ) {}
}
