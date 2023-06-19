import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Comic } from '@features/comics/comic';
import { ComicFormValue } from '@features/comics/comic-add-edit-form/comic-form-value';
import { ComicFormService } from '@features/comics/comic-add-edit-form/comic-form.service';
import { ComicsStoreService } from '@features/comics/comics-store.service';
import { addComicAction } from '@features/comics/state/comics.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-comic-add-page',
  templateUrl: './comic-add-page.component.html',
  styleUrls: ['./comic-add-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicAddPageComponent implements OnDestroy {
  comic!: Partial<Comic>;
  isSubmitButtonDisabled: boolean;

  @ViewChild('footer') footer!: TemplateRef<any>;

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
    data: {
      comicFormValue: Readonly<ComicFormValue>;
      isComicFormValid: boolean;
    };
  }) {
    let action: string;
    let comicFormValue: Readonly<ComicFormValue>;
    let isComicFormValid: boolean;
    let formatedComic: Partial<Comic>;

    action = event.action;
    comicFormValue = { ...event.data.comicFormValue };
    isComicFormValid = event.data.isComicFormValid;

    if (action == 'addComic') {
      if (isComicFormValid) {
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

    this.store.dispatch(addComicAction({ comic: this.comic }));

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
    this.router.navigate(['/home', 'comics']).catch((error) => error);
  }
}
