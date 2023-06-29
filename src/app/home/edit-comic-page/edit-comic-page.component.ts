import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comic, EditComicEvent } from '@features/comics/models';
import { ComicFormValue } from '@features/comics/models/comic-form';
import { EventBus, EventBusReceiver } from '@shared/models';
import { Observable, of, switchMap } from 'rxjs';
import { EditComicFacadeService } from './edit-comic-facade.service';

@Component({
  selector: 'app-edit-comic-page',
  templateUrl: './edit-comic-page.component.html',
  styleUrls: ['./edit-comic-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComicPageComponent
  implements EventBusReceiver, OnInit, OnDestroy
{
  comic$!: Observable<Readonly<Comic>>;
  comicUrlSegment!: string;
  editedComic!: Readonly<Comic>;
  eventNameSource!: EventBus['name'];
  isSubmitButtonDisabled!: boolean;

  constructor(
    private editComicFacadeService: EditComicFacadeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setInitialValues();
  }

  ngOnDestroy(): void {
    this.editComicFacadeService.clearApiState();
  }

  cancelEditComic(): void {
    this.navigateToComicDetailPage();
  }

  editComic(): void {
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

  onEvent(event: EventBus): void {
    let eventName: EventBus['name'];

    eventName = event.name;

    if (eventName == this.eventNameSource) {
      this.prepareToEditComic(event);
    }
  }

  prepareToEditComic(event: EditComicEvent): void {
    let comicFormValue: Readonly<ComicFormValue>;
    let isComicFormValid: boolean;
    let isComicFormDirty: boolean;
    let hasChanges: boolean;
    let originalComic: Readonly<Comic>;
    let editedComicFields: Partial<Comic>;

    comicFormValue = { ...event.data.comicFormValue };
    isComicFormValid = event.data.isComicFormValid;
    isComicFormDirty = event.data.isComicFormDirty!;
    hasChanges = event.data.hasChanges!;

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

  private navigateToComicDetailPage(): void {
    this.router
      .navigate(['/home', 'comics', this.comicUrlSegment])
      .catch((error) => error);
  }

  private setInitialValues() {
    this.comicUrlSegment = this.route.snapshot?.params['comicUrlSegment'];
    this.comic$ = this.editComicFacadeService.getComic(this.comicUrlSegment);

    this.isSubmitButtonDisabled = true;
    this.eventNameSource = 'editComic';
  }
}
