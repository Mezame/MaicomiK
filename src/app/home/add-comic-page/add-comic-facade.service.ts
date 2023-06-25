import { Injectable } from '@angular/core';
import { ApiState, AppStoreService } from '@core/services/app-store.service';
import { Comic, ComicFormValue } from '@features/comics/models';
import { ComicFormService } from '@features/comics/services/comic-form.service';
import { addComicAction } from '@features/comics/state';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddComicFacadeService {
  constructor(
    private appStoreService: AppStoreService,
    private comicFormService: ComicFormService,
    private store: Store
  ) {}

  addComic(comic: Partial<Comic>): void {
    this.store.dispatch(addComicAction({ comic }));
  }

  clearApiState(): void {
    this.appStoreService.clearApiState();
  }

  formatComicChapter(comicFormValue: ComicFormValue): Comic {
    const comic = this.comicFormService.formatChapter(comicFormValue);

    return comic;
  }

  getApiState(): Observable<ApiState | null> {
    const apiState = this.appStoreService.getApiState().pipe(take(1));

    return apiState;
  }
}
