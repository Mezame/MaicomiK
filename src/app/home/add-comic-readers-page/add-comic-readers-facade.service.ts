import { Injectable } from '@angular/core';
import { Comic } from '@features/comics/models';
import { ApiState, ComicsStoreService } from '@features/comics/services/comics-store.service';
import { selectComic } from '@features/comics/state';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddComicReadersFacadeService {
  constructor(
    private comicsStoreService: ComicsStoreService,
    private store: Store
  ) {}

  addComicReaders(comic: Comic): void {
    this.store.dispatch({
      type: '[Comic Readers Add Page] Update Comic',
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
          this.store.dispatch({ type: '[Comic Readers Add Page] Load Comics' });

          return {} as unknown as Readonly<Comic>;
        }

        return comic;
      })
    );

    return comic$;
  }
}
