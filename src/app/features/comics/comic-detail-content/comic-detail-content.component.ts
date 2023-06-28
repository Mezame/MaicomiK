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
  IncrementComicChapterEvent,
  OpenComicBottomSheetEvent,
} from '../models';

@Component({
  selector: 'app-comic-detail-content',
  templateUrl: './comic-detail-content.component.html',
  styleUrls: ['./comic-detail-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicDetailContentComponent implements OnInit {
  @Input() comic!: Readonly<Comic>;

  @Output() eventBus!: EventEmitter<
    IncrementComicChapterEvent | OpenComicBottomSheetEvent
  >;

  constructor() {
    this.eventBus = new EventEmitter();
  }

  ngOnInit(): void {
    this.setInitialValues();
  }

  emitIncrementChapter(data: Readonly<Comic>) {
    let eventName: string;
    let event: IncrementComicChapterEvent;

    eventName = 'incrementComicChapter';
    event = { name: eventName, data };

    this.eventBus.emit(event);
  }

  emitOpenComicBottomSheet(data = {}) {
    let eventName: string;
    let event: OpenComicBottomSheetEvent;

    eventName = 'openComicBottomSheet';
    event = { name: eventName, data };

    this.eventBus.emit(event);
  }

  private setInitialValues(): void {
    /**EMPTY */
  }
}
