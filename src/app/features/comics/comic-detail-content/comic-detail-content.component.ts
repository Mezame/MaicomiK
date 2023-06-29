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
  IncrementComicChapterEvent,
  OpenComicBottomSheetEvent,
} from '../models';

@Component({
  selector: 'app-comic-detail-content',
  templateUrl: './comic-detail-content.component.html',
  styleUrls: ['./comic-detail-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicDetailContentComponent implements EventBusEmitter, OnInit {
  @Input('data')
  comic!: Readonly<Comic>;

  @Output('eventBus')
  outgoingEvent: EventEmitter<EventBus>;

  constructor() {
    this.outgoingEvent = new EventEmitter();
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

  private setInitialValues(): void {
    /**EMPTY */
  }
}
