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
  IncrementComicChapterEvent,
  LoadComicEvent,
  OpenComicBottomSheetEvent,
} from '../models';

@Component({
  selector: 'app-comic-detail-content',
  templateUrl: './comic-detail-content.component.html',
  styleUrls: ['./comic-detail-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicDetailContentComponent
  implements EventBusEmitter, OnChanges, OnInit
{
  comic!: Readonly<Comic>;

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

  ngOnInit(): void {
    this.setInitialValues();
  }

  emitEvent(event: EventBus): void {
    this.outgoingEvent.emit(event);
  }

  emitIncrementChapter(data: Readonly<Comic>) {
    let eventName: string;
    let event: IncrementComicChapterEvent;

    eventName = 'incrementComicChapter';
    event = { name: eventName, data };

    this.emitEvent(event);
  }

  emitOpenComicBottomSheet(data = {}) {
    let eventName: string;
    let event: OpenComicBottomSheetEvent;

    eventName = 'openComicBottomSheet';
    event = { name: eventName, data };

    this.emitEvent(event);
  }

  private onIncomingEvent(event: EventBus): void {
    const loadComicEvent: LoadComicEvent = event;

    this.comic = loadComicEvent.data;
  }

  private setInitialValues(): void {
    /**EMPTY */
  }
}
