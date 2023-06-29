import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Comic,
  IncrementComicChapterEvent,
  OpenComicBottomSheetEvent,
} from '@features/comics/models';
import { EventBus, EventBusReceiver } from '@shared/models';
import { Observable } from 'rxjs';
import { ComicDetailFacadeService } from './comic-detail-facade.service';

@Component({
  selector: 'app-comic-detail-page',
  templateUrl: './comic-detail-page.component.html',
  styleUrls: ['./comic-detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicDetailPageComponent implements EventBusReceiver, OnInit, OnDestroy {
  comic$!: Observable<Readonly<Comic>>;

  @ViewChild('bottomSheet') bottomSheet!: TemplateRef<any>;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private comicDetailFacadeService: ComicDetailFacadeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setInitialValues();
  }

  ngOnDestroy(): void {
    this.comicDetailFacadeService.clearApiState();
  }

  closeBottomSheet(): void {
    this._bottomSheet.dismiss();
  }

  deleteComic(comicId: string): void {
    this.closeBottomSheet();

    this.comicDetailFacadeService.deleteComic(comicId);

    this.comicDetailFacadeService.getApiState().subscribe((apiState) => {
      if (
        apiState?.operation == 'deleteComic' &&
        apiState.status == 'success'
      ) {
        this.navigateToComicListPage();
      }
    });
  }

  deleteComicNotes(comic: Readonly<Comic>): void {
    let comicFields: Partial<Comic>;

    this.closeBottomSheet();
    comicFields = { notes: null };

    this.comicDetailFacadeService.deleteComicNotes(comic, comicFields);
  }

  deleteComicReaders(comic: Readonly<Comic>): void {
    let comicFields: Partial<Comic>;

    this.closeBottomSheet();
    comicFields = { readers: null };

    this.comicDetailFacadeService.deleteComicReaders(comic, comicFields);
  }

  openBottomSheet(): void {
    this._bottomSheet.open(this.bottomSheet);
  }

  incrementComicChapter(comic: Readonly<Comic>): void {
    let updatedChapter: number;
    let comicFields: Partial<Comic>;

    updatedChapter = comic.chapter + 1;
    comicFields = { chapter: updatedChapter };

    this.comicDetailFacadeService.incrementComicChapter(comic, comicFields);
  }

  onEvent(event: EventBus): void {
    let eventName: string;

    eventName = event.name;

    if (eventName == 'incrementComicChapter') {
      this.tryToIncrementComicChapter(event);
    }

    if (eventName == 'openComicBottomSheet') {
      this.tryToOpenComicBottomSheet(event);
    }
  }

  tryToIncrementComicChapter(event: IncrementComicChapterEvent): void {
    let comic: Readonly<Comic>;

    comic = event.data;

    this.incrementComicChapter(comic);
  }

  tryToOpenComicBottomSheet(_event: OpenComicBottomSheetEvent) {
    this.openBottomSheet();
  }

  private navigateToComicListPage(): void {
    this.router.navigate(['/home', 'comics']).catch((error) => error);
  }

  private setInitialValues(): void {
    const comicUrlSegment = this.route.snapshot?.params['comicUrlSegment'];

    this.comic$ = this.comicDetailFacadeService.getComic(comicUrlSegment);
  }
}
