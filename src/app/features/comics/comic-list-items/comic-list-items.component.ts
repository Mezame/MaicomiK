import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { EventBus, EventBusEmitter } from '@shared/models';
import {
  Comic,
  GoToComicDetailEvent,
  IncrementComicChapterEvent,
  LoadComicsEvent,
} from '../models';

@Component({
  selector: 'app-comic-list-items',
  templateUrl: './comic-list-items.component.html',
  styleUrls: ['./comic-list-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicListItemsComponent
  implements EventBusEmitter, OnChanges, OnInit
{
  comics!: readonly Comic[];

  @Input('eventBus')
  incomingEvent!: EventBus;

  @Output('eventBus')
  outgoingEvent: EventEmitter<EventBus>;

  constructor() {
    this.outgoingEvent = new EventEmitter();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['incomingEvent']) {
      this.onIncomingEvent(changes['incomingEvent'].currentValue);
    }
  }

  onIncomingEvent(event: EventBus): void {
    const loadComicsEvent: LoadComicsEvent = event;

    console.log(loadComicsEvent);
    this.comics = loadComicsEvent.data;
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
