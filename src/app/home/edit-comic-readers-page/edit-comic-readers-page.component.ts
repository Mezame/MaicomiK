import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AddEditComicReadersEvent,
  Comic,
  ComicReadersFormValue,
  EventBus,
} from '@features/comics/models';
import { Observable } from 'rxjs';
import { EditComicReadersFacadeService } from './edit-comic-readers-facade.service';

@Component({
  selector: 'app-edit-comic-readers-page',
  templateUrl: './edit-comic-readers-page.component.html',
  styleUrls: ['./edit-comic-readers-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComicReadersPageComponent {
  comic$!: Observable<Readonly<Comic>>;
  comicUrlSegment!: string;
  updatedComic!: Comic;
  isSubmitButtonDisabled!: boolean;

  constructor(
    private editComicReadersFacadeService: EditComicReadersFacadeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setInitialValues();
  }

  ngOnDestroy(): void {
    this.editComicReadersFacadeService.clearApiState();
  }

  cancelEditComicReaders() {
    this.navigateToComicDetailPage();
  }

  editComicReaders(): void {
    this.isSubmitButtonDisabled = true;

    this.editComicReadersFacadeService.editComicReaders(this.updatedComic);

    this.editComicReadersFacadeService.getApiState().subscribe((apiState) => {
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

  onEventBus(event: EventBus): void {
    let eventName: string;

    eventName = event.name;

    if (eventName == 'editComicReaders') {
      this.prepareToEditComicReaders(event);
    }
  }

  prepareToEditComicReaders(event: AddEditComicReadersEvent): void {
    let comicReadersFormValue: readonly ComicReadersFormValue[];
    let isComicReadersFormValid: boolean;
    let comicReaders: Comic['readers'];
    let originalComic: Readonly<Comic>;

    comicReadersFormValue = [...event.data.comicReadersFormValue];
    isComicReadersFormValid = event.data.isComicReadersFormValid;
    originalComic = { ...event.data.originalComic };

    if (isComicReadersFormValid) {
      comicReaders = [...comicReadersFormValue] as unknown as Comic['readers'];

      this.updatedComic = { ...originalComic, readers: comicReaders };

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

    this.comic$ = this.editComicReadersFacadeService.getComic(
      this.comicUrlSegment
    );

    this.isSubmitButtonDisabled = true;
  }
}
