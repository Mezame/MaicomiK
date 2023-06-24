import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comic, ComicReadersFormValue } from '@features/comics/models';
import { ComicsStoreService } from '@features/comics/services/comics-store.service';
import { selectComic } from '@features/comics/state';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-comic-readers-add-page',
  templateUrl: './comic-readers-add-page.component.html',
  styleUrls: ['./comic-readers-add-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicReadersAddPageComponent {
  comic$: Observable<Readonly<Comic>>;
  comicUrlSegment: string;
  updatedComic!: Readonly<Comic>;
  isSubmitButtonDisabled: boolean;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private comicsStoreService: ComicsStoreService,
    private router: Router
  ) {
    this.comicUrlSegment = this.route.snapshot?.params['comicUrlSegment'];

    this.comic$ = this.store.select(selectComic(this.comicUrlSegment)).pipe(
      map((comic) => {
        if (!comic) {
          this.store.dispatch({ type: '[Comic Readers Add Page] Load Comics' });

          return {} as unknown as Readonly<Comic>;
        }

        return comic;
      })
    );

    this.isSubmitButtonDisabled = true;
  }

  getFormAction(event: {
    action: string;
    data: {
      comicReadersFormValue: readonly ComicReadersFormValue[];
      isComicReadersFormValid: boolean;
      originalComic: Readonly<Comic>;
    };
  }) {
    let action: string;
    let comicReadersFormValue: readonly ComicReadersFormValue[];
    let isComicReadersFormValid: boolean;
    let comicReaders: Comic['readers'];
    let originalComic: Readonly<Comic>;

    action = event.action;
    comicReadersFormValue = [...event.data.comicReadersFormValue];
    isComicReadersFormValid = event.data.isComicReadersFormValid;
    originalComic = { ...event.data.originalComic };

    if (action == 'addComicReaders') {
      if (isComicReadersFormValid) {
        comicReaders = [
          ...comicReadersFormValue,
        ] as unknown as Comic['readers'];

        this.updatedComic = { ...originalComic, readers: comicReaders };

        this.isSubmitButtonDisabled = false;
      } else {
        this.isSubmitButtonDisabled = true;
      }
    }
  }

  addComicReaders() {
    this.isSubmitButtonDisabled = true;

    this.store.dispatch({
      type: '[Comic Readers Add Page] Update Comic',
      comic: this.updatedComic,
    });

    this.comicsStoreService.getApiState().subscribe((apiState) => {
      if (
        apiState?.operation == 'updateComic' &&
        apiState.status == 'failure'
      ) {
        setTimeout(() => {
          this.isSubmitButtonDisabled = false;
        }, 3000);

        return;
      }

      this.navigateToComicDetailPage();
    });
  }

  cancel() {
    this.navigateToComicDetailPage();
  }

  private navigateToComicDetailPage() {
    this.router
      .navigate(['/home', 'comics', this.comicUrlSegment])
      .catch((error) => error);
  }
}
