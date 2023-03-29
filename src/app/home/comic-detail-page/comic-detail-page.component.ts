import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { Comic } from '@features/comics/comic';
import { ComicDetailBottomSheetComponent } from 'src/app/home/comic-detail-bottom-sheet/comic-detail-bottom-sheet.component';
import {
  incrementComicChapterAction,
  loadComicsAction,
} from '@features/comics/state/comics.actions';
import { selectComic } from '@features/comics/state/comics.selectors';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { ComicsService } from '@features/comics/comics.service';

@Component({
  selector: 'app-comic-detail-page',
  templateUrl: './comic-detail-page.component.html',
  styleUrls: ['./comic-detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicDetailPageComponent {
  comic$: Observable<Readonly<Comic>>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private _bottomSheet: MatBottomSheet,
    private comicsService: ComicsService
  ) {
    const comicUrlSegment = this.route.snapshot?.params['comicUrlSegment'];

    this.comic$ = this.store.select(selectComic(comicUrlSegment)).pipe(
      map((comic) => {
        if (!comic) {
          this.store.dispatch(loadComicsAction());

          return {} as Readonly<Comic>;
        }

        return comic;
      })
    );
  }

  getContentAction(event: { action: string; data: Readonly<Comic> }) {
    let action: string;
    let comic: Readonly<Comic>;

    action = event.action;
    comic = event.data;

    if (action == 'incrementChapter') {
      this.incrementComicChapter(comic);
    }

    if (action == 'openBottomSheet') {
      this.openBottomSheet(comic);
    }
  }

  incrementComicChapter(comic: Readonly<Comic>) {
    let updatedChapter: number;
    let comicFields: Partial<Comic>;

    updatedChapter = comic.chapter + 1;
    comicFields = { chapter: updatedChapter };

    this.store.dispatch(
      incrementComicChapterAction({ comic, fields: comicFields })
    );
  }

  openBottomSheet(comic: Readonly<Comic>): void {
    this._bottomSheet.open(ComicDetailBottomSheetComponent, {
      data: { comic },
    });
  }
}
