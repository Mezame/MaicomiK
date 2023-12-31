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
} from '@features/comics/models';
import { EventBus, EventBusReceiver } from '@shared/models';
import { Observable } from 'rxjs';
import { EditComicNotesFacadeService } from './edit-comic-notes-facade.service';

@Component({
  selector: 'app-edit-comic-notes-page',
  templateUrl: './edit-comic-notes-page.component.html',
  styleUrls: ['./edit-comic-notes-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComicNotesPageComponent
  implements EventBusReceiver, OnInit, OnDestroy
{
  comic$!: Observable<Readonly<Comic>>;
  comicUrlSegment!: string;
  eventNameSource!: EventBus['name'];
  updatedComic!: Comic;
  isSubmitButtonDisabled!: boolean;

  constructor(
    private editComicNotesFacadeService: EditComicNotesFacadeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setInitialValues();
  }

  ngOnDestroy(): void {
    this.editComicNotesFacadeService.clearApiState();
  }

  cancelEditComicNotes(): void {
    this.navigateToComicDetailPage();
  }

  editComicNotes(): void {
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

  onEvent(event: EventBus): void {
    let eventName: EventBus['name'];

    eventName = event.name;

    if (eventName == this.eventNameSource) {
      this.prepareToEditComicNotes(event);
    }
  }

  prepareToEditComicNotes(event: AddEditComicNotesEvent): void {
    let comicNotesFormValue: ComicNotesFormValue;
    let isComicNotesFormValid: boolean;
    let isComicNotesFormDirty: boolean;
    let comicNotes: Comic['notes'];
    let originalComic: Readonly<Comic>;

    comicNotesFormValue = event.data.comicNotesFormValue;
    isComicNotesFormValid = event.data.isComicNotesFormValid;
    isComicNotesFormDirty = event.data.isComicNotesFormDirty!;
    originalComic = { ...event.data.originalComic };

    if (isComicNotesFormValid && isComicNotesFormDirty) {
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
    this.comic$ = this.editComicNotesFacadeService.getComic(
      this.comicUrlSegment
    );

    this.eventNameSource = 'editComicNotes';
    this.isSubmitButtonDisabled = true;
  }
}
