import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comic, ComicReadersFormValue } from '@features/comics/models';
import { Observable } from 'rxjs';
import { EditComicReadersFacadeService } from './edit-comic-readers-facade.service';

@Component({
  selector: 'app-edit-comic-readers-page',
  templateUrl: './edit-comic-readers-page.component.html',
  styleUrls: ['./edit-comic-readers-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComicReadersPageComponent {
  comic$: Observable<Readonly<Comic>>;
  comicUrlSegment: string;
  updatedComic!: Comic;
  isSubmitButtonDisabled: boolean;

  constructor(
    private editComicReadersFacadeService: EditComicReadersFacadeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.comicUrlSegment = this.route.snapshot?.params['comicUrlSegment'];

    this.comic$ = this.editComicReadersFacadeService.getComic(
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

  editComicReaders() {
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

  cancel() {
    this.navigateToComicDetailPage();
  }

  private navigateToComicDetailPage() {
    this.router
      .navigate(['/home', 'comics', this.comicUrlSegment])
      .catch((error) => error);
  }
}
