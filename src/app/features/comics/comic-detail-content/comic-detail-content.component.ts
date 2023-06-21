import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Comic } from '../comic';

@Component({
  selector: 'app-comic-detail-content',
  templateUrl: './comic-detail-content.component.html',
  styleUrls: ['./comic-detail-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicDetailContentComponent {
  @Input() comic!: Readonly<Comic>;

  @Output() actionEvent = new EventEmitter<{
    action: string;
    data: Readonly<Comic>;
  }>();

  emitIncrementChapterAction(data: Readonly<Comic>) {
    const action = 'incrementChapter';

    this.actionEvent.emit({ action, data });
  }

  emitOpenBottomSheetAction(data: Readonly<Comic>) {
    const action = 'openBottomSheet';

    this.actionEvent.emit({ action, data });
  }
}
