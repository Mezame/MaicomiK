import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { Comic } from '@features/comics/comic';

@Component({
  selector: 'app-comic-detail-bottom-sheet',
  templateUrl: './comic-detail-bottom-sheet.component.html',
  styleUrls: ['./comic-detail-bottom-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicDetailBottomSheetComponent {
  comic: Comic;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<ComicDetailBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { comic: Comic }
  ) {
    this.comic = data.comic;
  }

  openLink(): void {
    this._bottomSheetRef.dismiss();
  }

  deleteComic() {
    console.log('deleted comic: ', this.comic.title);

    this._bottomSheetRef.dismiss();
  }
}
