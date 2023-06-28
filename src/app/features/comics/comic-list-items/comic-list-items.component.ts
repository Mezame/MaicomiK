import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  Comic,
  GoToComicDetailEvent,
  IncrementComicChapterEvent,
} from '../models';

@Component({
  selector: 'app-comic-list-items',
  templateUrl: './comic-list-items.component.html',
  styleUrls: ['./comic-list-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicListItemsComponent implements OnInit {
  @Input() comics!: readonly Comic[];

  @Output() eventBus: EventEmitter<
    IncrementComicChapterEvent | GoToComicDetailEvent
  >;

  constructor() {
    this.eventBus = new EventEmitter();
  }

  ngOnInit(): void {
    this.setInitialValues();
  }

  emitIncrementComicChapter(data: Readonly<Comic>): void {
    let eventName: string;
    let event: IncrementComicChapterEvent;

    eventName = 'incrementComicChapter';
    event = { name: eventName, data };

    this.eventBus.emit(event);
  }

  emitGoToComicDetail(data: Readonly<Comic>): void {
    let eventName: string;
    let event: IncrementComicChapterEvent;

    eventName = 'goToComicDetail';
    event = { name: eventName, data };

    this.eventBus.emit(event);
  }

  private setInitialValues(): void {
    /**EMPTY */
  }
}
