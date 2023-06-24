import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comic } from '@features/comics/models';
import { ComicFormValue } from '@features/comics/models/comic-form';
import { Observable } from 'rxjs';
import { EditComicFacadeService } from './edit-comic-facade.service';

@Component({
  selector: 'app-edit-comic-page',
  templateUrl: './edit-comic-page.component.html',
  styleUrls: ['./edit-comic-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComicPageComponent {
  comic$: Observable<Readonly<Comic>>;
  comicUrlSegment: string;
  editedComic!: Readonly<Comic>;
  isSubmitButtonDisabled: boolean;

  constructor(
    private editComicFacadeService: EditComicFacadeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.comicUrlSegment = this.route.snapshot?.params['comicUrlSegment'];

    this.comic$ = this.editComicFacadeService.getComic(this.comicUrlSegment);

    this.isSubmitButtonDisabled = true;
  }

  ngOnDestroy(): void {
    this.editComicFacadeService.clearApiState();
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
          this.editComicFacadeService.formatComicChapter(comicFormValue);

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

    this.editComicFacadeService.editComic(this.editedComic);

    this.editComicFacadeService.getApiState().subscribe((apiState) => {
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
