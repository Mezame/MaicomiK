import { Injectable } from '@angular/core';
import { ApiState } from '@core/app-store';
import { AppStore } from '@core/app-store.service';
import { Comic } from '@features/comics/models';
import { selectComic } from '@features/comics/state';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';
import { EditComicNotesServices } from './edit-comic-notes';

@Injectable({
  providedIn: 'root',
})
export class EditComicNotesFacadeService implements EditComicNotesServices {
  constructor(private appStore: AppStore, private store: Store) {}

  clearApiState(): void {
    this.appStore.clearApiState();
  }

  editComicNotes(comic: Comic): void {
    this.store.dispatch({
      type: '[Edit Comic Notes Page] Update Comic',
      comic,
    });
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
