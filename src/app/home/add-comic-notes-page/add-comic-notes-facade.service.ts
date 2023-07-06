import { Injectable } from '@angular/core';
import { ApiState, AppStore } from '@core/services/app-store.service';
import { Comic } from '@features/comics/models';
import { selectComic } from '@features/comics/state';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';
import { AddComicNotesServices } from './add-comic-notes';

@Injectable({
  providedIn: 'root',
})
export class AddComicNotesFacadeService implements AddComicNotesServices {
  constructor(private appStore: AppStore, private store: Store) {}

  addComicNotes(comic: Comic): void {
    this.store.dispatch({
      type: '[Add Comic Notes Page] Update Comic',
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
    this.store.dispatch({ type: '[Add Comic Notes Page] Load Comics' });
  }
}
