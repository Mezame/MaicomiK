import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { EventBus, EventBusEmitter } from '@shared/models';
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
export class ComicListItemsComponent implements EventBusEmitter, OnInit {
  @Input('data') comics!: readonly Comic[];

  @Output('eventBus') outgoingEvent: EventEmitter<EventBus>;

  constructor() {
    this.outgoingEvent = new EventEmitter();
  }

  ngOnInit(): void {
    this.setInitialValues();
  }

  emitEvent(event: EventBus): void {
    this.outgoingEvent.emit(event);
  }

  emitGoToComicDetail(data: Readonly<Comic>): void {
    let eventName: EventBus['name'];
    let event: GoToComicDetailEvent;

    eventName = 'goToComicDetail';
    event = { name: eventName, data };

    this.emitEvent(event);
  }

  emitIncrementComicChapter(data: Readonly<Comic>): void {
    let eventName: EventBus['name'];
    let event: IncrementComicChapterEvent;

    eventName = 'incrementComicChapter';
    event = { name: eventName, data };

    this.emitEvent(event);
  }

  private setInitialValues(): void {
    /**EMPTY */
  }
}
