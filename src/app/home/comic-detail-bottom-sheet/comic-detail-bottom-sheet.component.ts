import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-comic-detail-bottom-sheet',
  templateUrl: './comic-detail-bottom-sheet.component.html',
  styleUrls: ['./comic-detail-bottom-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicDetailBottomSheetComponent {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<ComicDetailBottomSheetComponent>
  ) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
