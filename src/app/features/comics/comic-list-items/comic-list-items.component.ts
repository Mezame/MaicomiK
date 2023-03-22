import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Comic } from '../comic';

@Component({
  selector: 'app-comic-list-items',
  templateUrl: './comic-list-items.component.html',
  styleUrls: ['./comic-list-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicListItemsComponent {
  @Input() comics: readonly Comic[] = [];

  @Output() actionEvent = new EventEmitter<{
    action: string;
    data: string;
  }>();

  emitGoToComicAction(data: string) {
    const action = 'goToComic';

    this.actionEvent.emit({ action, data });
  }
}
