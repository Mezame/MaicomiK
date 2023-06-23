import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Comic } from '@features/comics/comic';
import { ComicFormValue } from '@features/comics/comic-add-edit-form/comic-form';
import { ComicAddFacadeService } from './comic-add-facade.service';

@Component({
  selector: 'app-comic-add-page',
  templateUrl: './comic-add-page.component.html',
  styleUrls: ['./comic-add-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicAddPageComponent implements OnDestroy {
  comic!: Partial<Comic>;
  isSubmitButtonDisabled: boolean;

  @ViewChild('footer') footer!: TemplateRef<any>;

  constructor(
    private comicAddFacadeService: ComicAddFacadeService,
    private router: Router
  ) {
    this.isSubmitButtonDisabled = true;
  }

  ngOnDestroy(): void {
    this.comicAddFacadeService.clearApiState();
  }

  getFormAction(event: {
    action: string;
    data: {
      comicFormValue: ComicFormValue;
      isComicFormValid: boolean;
    };
  }) {
    let action: string;
    let comicFormValue: ComicFormValue;
    let isComicFormValid: boolean;
    let formatedComic: Partial<Comic>;

    action = event.action;
    comicFormValue = { ...event.data.comicFormValue };
    isComicFormValid = event.data.isComicFormValid;

    if (action == 'addComic') {
      if (isComicFormValid) {
        formatedComic =
          this.comicAddFacadeService.formatComicChapter(comicFormValue);

        this.comic = { ...formatedComic };

        this.isSubmitButtonDisabled = false;
      } else {
        this.isSubmitButtonDisabled = true;
      }
    }
  }

  addComic() {
    this.isSubmitButtonDisabled = true;

    this.comicAddFacadeService.addComic(this.comic);

    this.comicAddFacadeService.getApiState().subscribe((apiState) => {
      if (apiState?.operation == 'addComic' && apiState.status == 'failure') {
        setTimeout(() => {
          this.isSubmitButtonDisabled = false;
        }, 3000);

        return;
      }

      this.navigateToComicListPage();
    });
  }

  cancel() {
    this.navigateToComicListPage();
  }

  private navigateToComicListPage() {
    this.router.navigate(['/home', 'comics']).catch((error) => error);
  }
}
