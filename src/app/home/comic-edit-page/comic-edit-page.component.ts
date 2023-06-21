import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comic } from '@features/comics/comic';
import { ComicFormValue } from '@features/comics/comic-add-edit-form/comic-form';
import { ComicFormService } from '@features/comics/comic-add-edit-form/comic-form.service';
import { ComicsStoreService } from '@features/comics/comics-store.service';
import { editComicAction } from '@features/comics/state/comics.actions';
import { selectComic } from '@features/comics/state/comics.selectors';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-comic-edit-page',
  templateUrl: './comic-edit-page.component.html',
  styleUrls: ['./comic-edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicEditPageComponent {
  comic$: Observable<Readonly<Comic>>;
  comicUrlSegment: string;
  editedComic!: Readonly<Comic>;
  isSubmitButtonDisabled: boolean;

  constructor(
    private route: ActivatedRoute,
    private comicFormService: ComicFormService,
    private store: Store,
    private comicsStoreService: ComicsStoreService,
    private router: Router
  ) {
    this.comicUrlSegment = this.route.snapshot?.params['comicUrlSegment'];

    this.comic$ = this.store.select(selectComic(this.comicUrlSegment)).pipe(
      map((comic) => {
        if (!comic) {
          this.store.dispatch({ type: '[Comic Edit Page] Load Comics' });

          return null as unknown as Readonly<Comic>;
        }

        return comic;
      })
    );

    this.isSubmitButtonDisabled = true;
  }

  ngOnDestroy(): void {
    this.comicsStoreService.clearApiState();
  }

  getFormAction(event: {
    action: string;
    data: {
      comicFormValue: Readonly<ComicFormValue>;
      isComicFormValid: boolean;
      isComicFormDirty?: boolean;
      hasChanges?: boolean;
      originalComic?: Readonly<Comic>;
    };
  }) {
    let action: string;
    let comicFormValue: Readonly<ComicFormValue>;
    let isComicFormValid: boolean;
    let isComicFormDirty: boolean;
    let hasChanges: boolean;
    let originalComic: Readonly<Comic>;
    let editedComicFields: Partial<Comic>;

    action = event.action;
    comicFormValue = { ...event.data.comicFormValue };
    isComicFormValid = event.data.isComicFormValid;
    isComicFormDirty = event.data.isComicFormDirty!;
    hasChanges = event.data.hasChanges!;

    if (action == 'editComic') {
      if (isComicFormValid && isComicFormDirty && hasChanges) {
        editedComicFields = this.comicFormService.formatChapter(comicFormValue);

        originalComic = event.data.originalComic!;

        this.editedComic = { ...originalComic, ...editedComicFields };

        this.isSubmitButtonDisabled = false;
      } else {
        this.isSubmitButtonDisabled = true;
      }
    }
  }

  editComic() {
    this.isSubmitButtonDisabled = true;

    this.store.dispatch(editComicAction({ comic: this.editedComic }));

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
