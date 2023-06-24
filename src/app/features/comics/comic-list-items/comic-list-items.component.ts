import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Comic } from '../models';

@Component({
  selector: 'app-comic-list-items',
  templateUrl: './comic-list-items.component.html',
  styleUrls: ['./comic-list-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicListItemsComponent {
  @Input() comics: readonly Comic[];

  @Output() actionEvent = new EventEmitter<{
    action: string;
    data: Readonly<Comic>;
  }>();

  constructor() {
    this.comics = [];
  }

  emitIncrementChapterAction(data: Readonly<Comic>) {
    const action = 'incrementChapter';

    this.actionEvent.emit({ action, data });
  }

  emitGoToComicDetailAction(data: Readonly<Comic>) {
    const action = 'goToComicDetail';

    this.actionEvent.emit({ action, data });
  }
}
