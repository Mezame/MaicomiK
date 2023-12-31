import { Injectable } from '@angular/core';
import { AppStore } from '@core/app-store.service';
import { Comic } from '@features/comics/models';
import { loadComicsAction, selectComics } from '@features/comics/state';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { ComicListServices } from './comic-list';

@Injectable({
  providedIn: 'root',
})
export class ComicListFacadeService implements ComicListServices {
  constructor(private appStore: AppStore, private store: Store) {}

  clearApiState(): void {
    this.appStore.clearApiState();
  }

  getComics(): Observable<readonly Comic[]> {
    const comics$ = this.store.select(selectComics).pipe(
      tap((comics) => {
        if (comics.length < 1) {
          this.loadComics();
        }
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

  loadComics(): void {
    this.store.dispatch(loadComicsAction());
  }

  reloadComics(): void {
    this.store.dispatch({ type: '[Comic List Page] Reload Comics' });
  }
}
