import { Injectable } from '@angular/core';
import { ApiState, AppStoreService } from '@core/services/app-store.service';
import { Comic } from '@features/comics/models';
import { selectComic } from '@features/comics/state';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddComicNotesFacadeService {
  constructor(private appStoreService: AppStoreService, private store: Store) {}

  addComicNotes(comic: Comic): void {
    this.store.dispatch({
      type: '[Comic Notes Add Page] Update Comic',
      comic,
    });
  }

  getApiState(): Observable<ApiState | null> {
    const apiState = this.appStoreService.getApiState().pipe(take(1));

    return apiState;
  }

  getComic(comicUrlSegment: string): Observable<Readonly<Comic>> {
    const comic$ = this.store.select(selectComic(comicUrlSegment)).pipe(
      map((comic) => {
        if (!comic) {
          this.store.dispatch({ type: '[Comic Notes Add Page] Load Comics' });

          return {} as unknown as Readonly<Comic>;
        }

        return comic;
      })
    );

    return comic$;
  }
}
