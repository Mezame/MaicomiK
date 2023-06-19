import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comic } from '@features/comics/comic';
import { ComicReadersFormValue } from '@features/comics/comic-readers-add-edit-form/comic-readers-form';
import { ComicsStoreService } from '@features/comics/comics-store.service';
import { selectComic } from '@features/comics/state/comics.selectors';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-comic-readers-edit-page',
  templateUrl: './comic-readers-edit-page.component.html',
  styleUrls: ['./comic-readers-edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicReadersEditPageComponent {
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
          this.store.dispatch({
            type: '[Comic Readers Edit Page] Load Comics',
          });

          return null as unknown as Readonly<Comic>;
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

  editComicReaders() {
    this.isSubmitButtonDisabled = true;

    this.store.dispatch({
      type: '[Comic Readers Edit Page] Update Comic',
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
