import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  AddEditComicEvent,
  Comic,
  ComicFormValue,
} from '@features/comics/models';
import { AddComicFacadeService } from './add-comic-facade.service';

@Component({
  selector: 'app-add-comic-page',
  templateUrl: './add-comic-page.component.html',
  styleUrls: ['./add-comic-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddComicPageComponent implements OnInit, OnDestroy {
  comic!: Partial<Comic>;
  isSubmitButtonDisabled!: boolean;

  @ViewChild('footer') footer!: TemplateRef<any>;

  constructor(
    private addComicFacadeService: AddComicFacadeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setInitialValues();
  }

  ngOnDestroy(): void {
    this.addComicFacadeService.clearApiState();
  }

  addComic(): void {
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

  cancelAddComic(): void {
    this.navigateToComicListPage();
  }

  onEventBus(event: AddEditComicEvent): void {
    let eventName: string;

    eventName = event.name;

    if (eventName == 'addComic') {
      this.tryToAddComic(event);
    }
  }

  tryToAddComic(event: AddEditComicEvent): void {
    let comicFormValue: ComicFormValue;
    let isComicFormValid: boolean;
    let formatedComic: Partial<Comic>;

    comicFormValue = { ...event.data.comicFormValue };
    isComicFormValid = event.data.isComicFormValid;

    if (isComicFormValid) {
      formatedComic =
        this.addComicFacadeService.formatComicChapter(comicFormValue);

      this.comic = { ...formatedComic };

      this.isSubmitButtonDisabled = false;
    }
  }

  private navigateToComicListPage(): void {
    this.router.navigate(['/home', 'comics']).catch((error) => error);
  }

  private setInitialValues(): void {
    this.isSubmitButtonDisabled = true;
  }
}
