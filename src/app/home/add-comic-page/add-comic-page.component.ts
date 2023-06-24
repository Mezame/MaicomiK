import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Comic, ComicFormValue } from '@features/comics/models';
import { AddComicFacadeService } from './add-comic-facade.service';

@Component({
  selector: 'app-add-comic-page',
  templateUrl: './add-comic-page.component.html',
  styleUrls: ['./add-comic-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddComicPageComponent implements OnDestroy {
  comic!: Partial<Comic>;
  isSubmitButtonDisabled: boolean;

  @ViewChild('footer') footer!: TemplateRef<any>;

  constructor(
    private addComicFacadeService: AddComicFacadeService,
    private router: Router
  ) {
    this.isSubmitButtonDisabled = true;
  }

  ngOnDestroy(): void {
    this.addComicFacadeService.clearApiState();
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
          this.addComicFacadeService.formatComicChapter(comicFormValue);

        this.comic = { ...formatedComic };

        this.isSubmitButtonDisabled = false;
      } else {
        this.isSubmitButtonDisabled = true;
      }
    }
  }

  addComic() {
    this.isSubmitButtonDisabled = true;

    this.addComicFacadeService.addComic(this.comic);

    this.addComicFacadeService.getApiState().subscribe((apiState) => {
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
