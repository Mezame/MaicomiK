import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-comic-list-bottom-sheet',
  templateUrl: './comic-list-bottom-sheet.component.html',
  styleUrls: ['./comic-list-bottom-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicListBottomSheetComponent {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<ComicListBottomSheetComponent>
  ) {}
}
