import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Comic } from '../models';

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
    data: Comic;
  }>();

  emitIncrementChapterAction(data: Comic) {
    const action = 'incrementChapter';

    this.actionEvent.emit({ action, data });
  }

  emitOpenBottomSheetAction(data: Comic) {
    const action = 'openBottomSheet';

    this.actionEvent.emit({ action, data });
  }
}
