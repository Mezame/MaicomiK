import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Comic } from '@features/comics/comic';
import { ComicFormValue } from '@features/comics/comic-add-edit-form/comic-form-value';
import { ComicFormService } from '@features/comics/comic-add-edit-form/comic-form.service';
import { ComicsStoreService } from '@features/comics/comics-store.service';
import { ComicsAddEditActions } from '@features/comics/state/comics.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-comic-add-edit-page',
  templateUrl: './comic-add-edit-page.component.html',
  styleUrls: ['./comic-add-edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicAddEditPageComponent implements OnDestroy {
  comic!: Readonly<Comic>;
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
    let formatedComic: Comic;

    action = event.action;
    comicFormValue = { ...event.data };
    isFormValid = event.isFormValid;
    formatedComic = this.comicFormService.formatChapter(comicFormValue);

    if (action == 'addComic') {
      if (isFormValid) {
        this.comic = { ...formatedComic };

        this.isSubmitButtonDisabled = false;
      }
    }
  }

  addComic() {
    this.isSubmitButtonDisabled = true;

    this.comic = {
      title: 'Bijutsubu Girl',
      format: 'manga',
      status: 'reading',
      chapter: 199,
      coverUrl:
        'https://mangadex.org/covers/d2b02bb0-a8ec-405f-9c2d-d63df7cff785/496bd7d9-750d-461a-a7a4-f932848b2461.jpg',
      metadata: {
        id: '',
        urlSegment: '',
        createdAt: null,
        updatedAt: null,
      },
    };

    this.store.dispatch(ComicsAddEditActions.addComic({ comic: this.comic }));

    this.comicsStoreService.getApiState().subscribe((apiState) => {
      if (apiState!.operation == 'addComic' && apiState!.status == 'failure') {
        this.isSubmitButtonDisabled = false;

        return;
      }

      this.router.navigateByUrl('/home/comics');
    });
  }
}
