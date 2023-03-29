import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Comic } from '@features/comics/comic';
import { ComicFormValue } from '@features/comics/comic-add-edit-form/comic-form-value';
import { ComicFormService } from '@features/comics/comic-add-edit-form/comic-form.service';
import { ComicsStoreService } from '@features/comics/comics-store.service';
import { ComicAddAction } from '@features/comics/state/comics.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-comic-add-page',
  templateUrl: './comic-add-page.component.html',
  styleUrls: ['./comic-add-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicAddPageComponent {
  comic!: Partial<Comic>;
  isSubmitButtonDisabled: boolean;

  constructor(
    private comicFormService: ComicFormService,
    private store: Store,
    private comicsStoreService: ComicsStoreService,
    private router: Router
  ) {
    this.isSubmitButtonDisabled = true;
  }

  ngOnDestroy(): void {
    this.comicsStoreService.clearApiState();
  }

  getFormAction(event: {
    action: string;
    data: Readonly<ComicFormValue>;
    isFormValid?: boolean;
  }) {
    let action: string;
    let comicFormValue: Readonly<ComicFormValue>;
    let isFormValid: boolean | undefined;
    let formatedComic: Partial<Comic>;

    action = event.action;
    comicFormValue = { ...event.data };
    isFormValid = event.isFormValid;

    if (action == 'addComic') {
      if (isFormValid) {
        formatedComic = this.comicFormService.formatChapter(comicFormValue);

        this.comic = { ...formatedComic };

        this.isSubmitButtonDisabled = false;
      } else {
        this.isSubmitButtonDisabled = true;
      }
    }
  }

  addComic() {
    this.isSubmitButtonDisabled = true;

    this.store.dispatch(ComicAddAction({ comic: this.comic }));

    this.comicsStoreService.getApiState().subscribe((apiState) => {
      if (apiState?.operation == 'addComic' && apiState.status == 'failure') {
        setTimeout(() => {
          this.isSubmitButtonDisabled = false;
        }, 3000);

        return;
      }

      this.navigateToComicListPage();
    });
  }

  cancel() {
    this.navigateToComicListPage();
  }

  private navigateToComicListPage() {
    this.router.navigateByUrl('/home/comics');
  }
}
