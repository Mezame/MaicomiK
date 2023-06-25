import { Injectable } from '@angular/core';
import { Comic } from '@features/comics/models';
import {
  ApiState,
  ComicsStoreService,
} from '@features/comics/services/comics-store.service';
import { selectComic } from '@features/comics/state';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditComicReadersFacadeService {
  constructor(
    private comicsStoreService: ComicsStoreService,
    private store: Store
  ) {}

  editComicReaders(comic: Comic): void {
    this.store.dispatch({
      type: '[Comic Readers Edit Page] Update Comic',
      comic,
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
          this.store.dispatch({
            type: '[Comic Readers Edit Page] Load Comics',
          });

          return null as unknown as Readonly<Comic>;
        }

        return comic;
      })
    );

    return comic$;
  }
}
