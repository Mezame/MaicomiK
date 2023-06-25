import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comic, ComicNotesFormValue } from '@features/comics/models';
import { Observable } from 'rxjs';
import { EditComicNotesFacadeService } from './edit-comic-notes-facade.service';

@Component({
  selector: 'app-edit-comic-notes-page',
  templateUrl: './edit-comic-notes-page.component.html',
  styleUrls: ['./edit-comic-notes-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComicNotesPageComponent {
  comic$: Observable<Readonly<Comic>>;
  comicUrlSegment: string;
  updatedComic!: Comic;
  isSubmitButtonDisabled: boolean;

  constructor(
    private editComicNotesFacadeService: EditComicNotesFacadeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.comicUrlSegment = this.route.snapshot?.params['comicUrlSegment'];

    this.comic$ = this.editComicNotesFacadeService.getComic(
      this.comicUrlSegment
    );

    this.isSubmitButtonDisabled = true;
  }

  getFormAction(event: {
    action: string;
    data: {
      comicNotesFormValue: ComicNotesFormValue;
      isComicNotesFormValid: boolean;
      isComicNotesFormDirty?: boolean;
      originalComic: Readonly<Comic>;
    };
  }) {
    let action: string;
    let comicNotesFormValue: ComicNotesFormValue;
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

    this.editComicNotesFacadeService.editComicNotes(this.updatedComic);

    this.editComicNotesFacadeService.getApiState().subscribe((apiState) => {
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
