import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AddEditComicNotesEvent,
  Comic,
  ComicNotesFormValue,
  EventBus,
} from '@features/comics/models';
import { Observable } from 'rxjs';
import { AddComicNotesFacadeService } from './add-comic-notes-facade.service';

@Component({
  selector: 'app-add-comic-notes-page',
  templateUrl: './add-comic-notes-page.component.html',
  styleUrls: ['./add-comic-notes-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddComicNotesPageComponent implements OnInit, OnDestroy {
  comic$!: Observable<Readonly<Comic>>;
  comicUrlSegment!: string;
  updatedComic!: Comic;
  isSubmitButtonDisabled!: boolean;

  constructor(
    private addComicNotesFacadeService: AddComicNotesFacadeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setInitialValues();
  }

  ngOnDestroy(): void {
    this.addComicNotesFacadeService.clearApiState();
  }

  addComicNotes(): void {
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

  cancelAddComicNotes(): void {
    this.navigateToComicDetailPage();
  }

  onEventBus(event: EventBus): void {
    let eventName: string;

    eventName = event.name;

    if (eventName == 'addComicNotes') {
      this.prepareToAddComicNotes(event);
    }
  }

  prepareToAddComicNotes(event: AddEditComicNotesEvent): void {
    let comicNotesFormValue: ComicNotesFormValue;
    let isComicNotesFormValid: boolean;
    let comicNotes: Comic['notes'];
    let originalComic: Readonly<Comic>;

    comicNotesFormValue = event.data.comicNotesFormValue;
    isComicNotesFormValid = event.data.isComicNotesFormValid;
    originalComic = { ...event.data.originalComic };

    if (isComicNotesFormValid) {
      comicNotes = comicNotesFormValue as Comic['notes'];

      this.updatedComic = { ...originalComic, notes: comicNotes };

      this.isSubmitButtonDisabled = false;
    }
  }

  private navigateToComicDetailPage(): void {
    this.router
      .navigate(['/home', 'comics', this.comicUrlSegment])
      .catch((error) => error);
  }

  private setInitialValues(): void {
    this.comicUrlSegment = this.route.snapshot?.params['comicUrlSegment'];

    this.comic$ = this.addComicNotesFacadeService.getComic(
      this.comicUrlSegment
    );

    this.isSubmitButtonDisabled = true;
  }
}
