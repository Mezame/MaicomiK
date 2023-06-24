import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comic } from '@features/comics/comic';
import { ComicFormValue } from '@features/comics/add-edit-comic-form/comic-form';
import { Observable } from 'rxjs';
import { ComicEditFacadeService } from './comic-edit-facade.service';

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
    private comicEditFacadeService: ComicEditFacadeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.comicUrlSegment = this.route.snapshot?.params['comicUrlSegment'];

    this.comic$ = this.comicEditFacadeService.getComic(this.comicUrlSegment);

    this.isSubmitButtonDisabled = true;
  }

  ngOnDestroy(): void {
    this.comicEditFacadeService.clearApiState();
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
        editedComicFields =
          this.comicEditFacadeService.formatComicChapter(comicFormValue);

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

    this.comicEditFacadeService.editComic(this.editedComic);

    this.comicEditFacadeService.getApiState().subscribe((apiState) => {
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
