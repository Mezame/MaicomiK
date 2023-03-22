import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Comic } from '../comic';

@Component({
  selector: 'app-comic-detail-content',
  templateUrl: './comic-detail-content.component.html',
  styleUrls: ['./comic-detail-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicDetailContentComponent {
  @Input() comic!: Comic;

  @Output() actionEvent = new EventEmitter<{
    action: string;
    data: Comic;
  }>();

  constructor() {}

  emitOpenBottomSheetAction(data: Comic) {
    const action = 'OpenBottomSheet';

    this.actionEvent.emit({ action, data });
  }
}
