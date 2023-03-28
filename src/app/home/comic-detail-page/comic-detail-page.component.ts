import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { Comic } from '@features/comics/comic';
import { ComicDetailBottomSheetComponent } from 'src/app/home/comic-detail-bottom-sheet/comic-detail-bottom-sheet.component';
import { LoadComicsAction } from '@features/comics/state/comics.actions';
import { selectComic } from '@features/comics/state/comics.selectors';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-comic-detail-page',
  templateUrl: './comic-detail-page.component.html',
  styleUrls: ['./comic-detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicDetailPageComponent {
  comic$: Observable<Comic>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private _bottomSheet: MatBottomSheet
  ) {
    const comicUrlSegment = this.route.snapshot?.params['comicUrlSegment'];

    this.comic$ = this.store.select(selectComic(comicUrlSegment)).pipe(
      map((comic) => {
        if (!comic) {
          this.store.dispatch(LoadComicsAction());

          return {} as Readonly<Comic>;
        }

        return { ...comic } as Readonly<Comic>;
      })
    );
  }

  openBottomSheet(event: { action: string; data: Readonly<Comic> }): void {
    const comic = event.data;

    this._bottomSheet.open(ComicDetailBottomSheetComponent, {
      data: { comic },
    });
  }
}
