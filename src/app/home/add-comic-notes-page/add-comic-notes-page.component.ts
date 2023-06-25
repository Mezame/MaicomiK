import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comic, ComicNotesFormValue } from '@features/comics/models';
import { selectComic } from '@features/comics/state';
import { Observable, map } from 'rxjs';
import { AddComicNotesFacadeService } from './add-comic-notes-facade.service';

@Component({
  selector: 'app-add-comic-notes-page',
  templateUrl: './add-comic-notes-page.component.html',
  styleUrls: ['./add-comic-notes-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddComicNotesPageComponent {
  comic$: Observable<Readonly<Comic>>;
  comicUrlSegment: string;
  updatedComic!: Comic;
  isSubmitButtonDisabled: boolean;

  constructor(
    private addComicNotesFacadeService: AddComicNotesFacadeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.comicUrlSegment = this.route.snapshot?.params['comicUrlSegment'];

    this.comic$ = this.addComicNotesFacadeService.getComic(
      this.comicUrlSegment
    );

    this.isSubmitButtonDisabled = true;
  }

  getFormAction(event: {
    action: string;
    data: {
      comicNotesFormValue: ComicNotesFormValue;
      isComicNotesFormValid: boolean;
      originalComic: Readonly<Comic>;
    };
  }) {
    let action: string;
    let comicNotesFormValue: ComicNotesFormValue;
    let isComicNotesFormValid: boolean;
    let comicNotes: Comic['notes'];
    let originalComic: Readonly<Comic>;

    action = event.action;
    comicNotesFormValue = event.data.comicNotesFormValue;
    isComicNotesFormValid = event.data.isComicNotesFormValid;
    originalComic = { ...event.data.originalComic };

    if (action == 'addComicNotes') {
      if (isComicNotesFormValid) {
        comicNotes = comicNotesFormValue as Comic['notes'];

        this.updatedComic = { ...originalComic, notes: comicNotes };

        this.isSubmitButtonDisabled = false;
      } else {
        this.isSubmitButtonDisabled = true;
      }
    }
  }

  addComicNotes() {
    this.isSubmitButtonDisabled = true;

    this.addComicNotesFacadeService.addComicNotes(this.updatedComic);

    this.addComicNotesFacadeService.getApiState().subscribe((apiState) => {
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
