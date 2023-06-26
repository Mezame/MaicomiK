import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AddEditComicReadersEvent,
  Comic,
  ComicReadersFormValue,
  EventBus,
} from '@features/comics/models';
import { Observable } from 'rxjs';
import { AddComicReadersFacadeService } from './add-comic-readers-facade.service';

@Component({
  selector: 'app-add-comic-readers-page',
  templateUrl: './add-comic-readers-page.component.html',
  styleUrls: ['./add-comic-readers-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddComicReadersPageComponent implements OnInit, OnDestroy {
  comic$!: Observable<Readonly<Comic>>;
  comicUrlSegment!: string;
  updatedComic!: Comic;
  isSubmitButtonDisabled!: boolean;

  constructor(
    private addComicReadersFacadeService: AddComicReadersFacadeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setInitialValues();
  }

  ngOnDestroy(): void {
    this.addComicReadersFacadeService.clearApiState();
  }

  addComicReaders(): void {
    this.isSubmitButtonDisabled = true;

    this.addComicReadersFacadeService.addComicReaders(this.updatedComic);

    this.addComicReadersFacadeService.getApiState().subscribe((apiState) => {
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

  cancelAddComicReaders(): void {
    this.navigateToComicDetailPage();
  }

  onEventBus(event: EventBus): void {
    let eventName: string;

    eventName = event.name;

    if (eventName == 'addComicReaders') {
      this.prepareToAddComicReaders(event);
    }
  }

  prepareToAddComicReaders(event: AddEditComicReadersEvent): void {
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

    this.comic$ = this.addComicReadersFacadeService.getComic(
      this.comicUrlSegment
    );

    this.isSubmitButtonDisabled = true;
  }
}
