import { Injectable } from '@angular/core';
import { AppStoreService } from '@core/services/app-store.service';
import { Comic } from '@features/comics/models';
import { loadComicsAction, selectComics } from '@features/comics/state';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComicListFacadeService {
  constructor(private appStoreService: AppStoreService, private store: Store) {}

  clearApiState(): void {
    this.appStoreService.clearApiState();
  }

  getComics(): Observable<readonly Comic[]> {
    const comics$ = this.store.select(selectComics).pipe(
      map((comics) => {
        if (!comics) {
          this.store.dispatch(loadComicsAction());

          return [];
        }

        return comics;
      })
    );

    return comics$;
  }

  incrementComicChapter(
    comic: Readonly<Comic>,
    comicFields: Partial<Comic>
  ): void {
    this.store.dispatch({
      type: '[Comic List Page] Increment Comic Chapter',
      comic,
      fields: comicFields,
    });
  }
}
