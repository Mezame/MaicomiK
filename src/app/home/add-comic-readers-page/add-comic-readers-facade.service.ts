import { Injectable } from '@angular/core';
import { ApiState, AppStore } from '@core/services/app-store.service';
import { Comic } from '@features/comics/models';
import { selectComic } from '@features/comics/state';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';
import { AddComicReadersServices } from './add-comic-readers';

@Injectable({
  providedIn: 'root',
})
export class AddComicReadersFacadeService implements AddComicReadersServices {
  constructor(private appStore: AppStore, private store: Store) {}

  addComicReaders(comic: Comic): void {
    this.store.dispatch({
      type: '[Add Comic Readers Page] Update Comic',
      comic,
    });
  }

  clearApiState(): void {
    this.appStore.clearApiState();
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

          return null as unknown as Readonly<Comic>;
        }

        return comic;
      })
    );

    return comic$;
  }

  loadComics(): void {
    this.store.dispatch({ type: '[Add Comic Readers Page] Load Comics' });
  }
}
