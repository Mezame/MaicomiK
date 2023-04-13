import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comic } from '@features/comics/comic';
import { ComicsStoreService } from '@features/comics/comics-store.service';
import { selectComic } from '@features/comics/state/comics.selectors';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-comic-notes-edit-page',
  templateUrl: './comic-notes-edit-page.component.html',
  styleUrls: ['./comic-notes-edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicNotesEditPageComponent {
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
          this.store.dispatch({ type: '[Comic Notes Edit Page] Load Comics' });

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
      comicNotesFormValue: string | null;
      isComicNotesFormValid: boolean;
      isComicNotesFormDirty?: boolean;
      originalComic: Readonly<Comic>;
    };
  }) {
    let action: string;
    let comicNotesFormValue: string | null;
    let isComicNotesFormValid: boolean;
    let isComicNotesFormDirty: boolean;
    let comicNotes: Comic['notes'];
    let originalComic: Readonly<Comic>;

    action = event.action;
    comicNotesFormValue = event.data.comicNotesFormValue;
    isComicNotesFormValid = event.data.isComicNotesFormValid;
    isComicNotesFormDirty = event.data.isComicNotesFormDirty!;
    originalComic = { ...event.data.originalComic };

    if (action == 'editComicNotes') {
      if (isComicNotesFormValid && isComicNotesFormDirty) {
        comicNotes = comicNotesFormValue as Comic['notes'];

        this.updatedComic = { ...originalComic, notes: comicNotes };

        this.isSubmitButtonDisabled = false;
      } else {
        this.isSubmitButtonDisabled = true;
      }
    }
  }

  editComicNotes() {
    this.isSubmitButtonDisabled = true;

    this.store.dispatch({
      type: '[Comic Notes Edit Page] Update Comic',
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
    this.router.navigate(['/home', 'comics', this.comicUrlSegment]);
  }
}
