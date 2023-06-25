import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comic, ComicReadersFormValue } from '@features/comics/models';
import { Observable } from 'rxjs';
import { AddComicReadersFacadeService } from './add-comic-readers-facade.service';

@Component({
  selector: 'app-add-comic-readers-page',
  templateUrl: './add-comic-readers-page.component.html',
  styleUrls: ['./add-comic-readers-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddComicReadersPageComponent {
  comic$: Observable<Readonly<Comic>>;
  comicUrlSegment: string;
  updatedComic!: Comic;
  isSubmitButtonDisabled: boolean;

  constructor(
    private addComicReadersFacadeService: AddComicReadersFacadeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.comicUrlSegment = this.route.snapshot?.params['comicUrlSegment'];

    this.comic$ = this.addComicReadersFacadeService.getComic(
      this.comicUrlSegment
    );

    this.isSubmitButtonDisabled = true;
  }

  getFormAction(event: {
    action: string;
    data: {
      comicReadersFormValue: readonly ComicReadersFormValue[];
      isComicReadersFormValid: boolean;
      originalComic: Readonly<Comic>;
    };
  }) {
    let action: string;
    let comicReadersFormValue: readonly ComicReadersFormValue[];
    let isComicReadersFormValid: boolean;
    let comicReaders: Comic['readers'];
    let originalComic: Readonly<Comic>;

    action = event.action;
    comicReadersFormValue = [...event.data.comicReadersFormValue];
    isComicReadersFormValid = event.data.isComicReadersFormValid;
    originalComic = { ...event.data.originalComic };

    if (action == 'addComicReaders') {
      if (isComicReadersFormValid) {
        comicReaders = [
          ...comicReadersFormValue,
        ] as unknown as Comic['readers'];

        this.updatedComic = { ...originalComic, readers: comicReaders };

        this.isSubmitButtonDisabled = false;
      } else {
        this.isSubmitButtonDisabled = true;
      }
    }
  }

  addComicReaders() {
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

  cancel() {
    this.navigateToComicDetailPage();
  }

  private navigateToComicDetailPage() {
    this.router
      .navigate(['/home', 'comics', this.comicUrlSegment])
      .catch((error) => error);
  }
}
