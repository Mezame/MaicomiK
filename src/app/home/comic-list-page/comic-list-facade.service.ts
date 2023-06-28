import { Injectable } from '@angular/core';
import { AppStoreService } from '@core/services/app-store.service';
import { Comic } from '@features/comics/models';
import { loadComicsAction, selectComics } from '@features/comics/state';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';

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
      take(2),
      map((comics) => {
        if (!comics) {

          return [];
        }

        if(comics.length < 1) {
          this.store.dispatch(loadComicsAction());
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
