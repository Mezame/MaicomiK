import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EventBus, EventBusEmitter } from '@shared/models';
import { comicChapterValidator, webUrlValidator } from '@shared/validators';
import * as _ from 'lodash';
import {
  AddComicEvent,
  Comic,
  ComicForm,
  ComicFormValue,
  ComicFormat,
  ComicStatus,
  EditComicEvent,
} from '../models';

@Component({
  selector: 'app-add-edit-comic-form',
  templateUrl: './add-edit-comic-form.component.html',
  styleUrls: ['./add-edit-comic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditComicFormComponent implements EventBusEmitter, OnInit {
  comicForm!: ComicForm;
  currentComicFormValue!: Partial<ComicFormValue>;
  formatList!: ComicFormat[];
  statusList!: ComicStatus[];
  previewImageSrc!: string | null;

  @Input('data') comic!: Readonly<Comic>;
  @Input('eventBus') incomingEvent!: EventBus['name'];

  @Output('eventBus') outgoingEvent: EventEmitter<EventBus>;

  constructor(private fb: FormBuilder) {
    this.outgoingEvent = new EventEmitter();
  }

  get titleCtrl() {
    return this.comicForm.controls['title'];
  }

  get formatCtrl() {
    return this.comicForm.controls['format'];
  }

  get statusCtrl() {
    return this.comicForm.controls['status'];
  }

  get chapterCtrl() {
    return this.comicForm.controls['chapter'];
  }

  get coverUrlCtrl() {
    return this.comicForm.controls['coverUrl'];
  }

  ngOnInit(): void {
    this.setInitialValues();

    this.setInitialComicFormValues();

    if (this.incomingEvent == 'editComic') {
      this.setCurrentComicFormValues();

      this.currentComicFormValue = { ...this.comicForm.value };

      this.setPreviewImageSrc();
    }

    this.comicForm.valueChanges.subscribe((_) => {
      this.onComicFormValueChanges();
    });
  }

  emitAddComic(comicFormValue: ComicFormValue, isComicFormValid = false): void {
    let eventName: EventBus['name'];
    let data: AddComicEvent['data'];
    let event: AddComicEvent;

    eventName = 'addComic';
    data = {
      comicFormValue,
      isComicFormValid,
    };
    event = { name: eventName, data };

    this.emitEvent(event);
  }

  emitEditComic(
    comicFormValue: ComicFormValue,
    originalComic: Readonly<Comic>,
    isComicFormValid = false,
    isComicFormDirty = false,
    hasChanges = false
  ): void {
    let eventName: EventBus['name'];
    let data: EditComicEvent['data'];
    let event: EditComicEvent;

    eventName = 'editComic';
    data = {
      comicFormValue,
      isComicFormValid,
      isComicFormDirty,
      hasChanges,
      originalComic,
    };
    event = { name: eventName, data };

    this.emitEvent(event);
  }

  emitEvent(event: EventBus): void {
    this.outgoingEvent.emit(event);
  }

  setPreviewImageSrc(): void {
    this.previewImageSrc = this.comicForm.value.coverUrl!;
  }

  tryToEmitAddComic(): void {
    let comicFormValue: ComicFormValue;
    let isComicFormValid: boolean;

    comicFormValue = { ...this.comicForm.value } as ComicFormValue;
    isComicFormValid = this.comicForm.valid;

    if (!isComicFormValid) {
      this.emitAddComic({} as any, isComicFormValid);

      return;
    }

    this.emitAddComic(comicFormValue, isComicFormValid);
  }

  tryToEmitEditComic(): void {
    let comicFormValue: ComicFormValue;
    let isComicFormValid: boolean;
    let isComicFormDirty: boolean;
    let hasChanges: boolean;

    comicFormValue = { ...this.comicForm.value } as ComicFormValue;
    isComicFormValid = this.comicForm.valid;
    isComicFormDirty = this.comicForm.dirty;

    hasChanges = !_.isEqual(comicFormValue, this.currentComicFormValue);

    if (!isComicFormValid || !isComicFormDirty || !hasChanges) {
      this.emitEditComic(
        {} as any,
        {} as any,
        isComicFormValid,
        isComicFormDirty,
        hasChanges
      );

      return;
    }

    this.emitEditComic(
      comicFormValue,
      this.comic,
      isComicFormValid,
      isComicFormDirty,
      hasChanges
    );
  }

  private onComicFormValueChanges(): void {
    if (this.incomingEvent == 'addComic') {
      this.tryToEmitAddComic();
    }

    if (this.incomingEvent == 'editComic') {
      this.tryToEmitEditComic();
    }
  }

  private setCurrentComicFormValues(): void {
    this.comicForm.patchValue({
      title: this.comic.title,
      format: this.comic.format,
      status: this.comic.status,
      chapter: this.comic.chapter?.toString(),
      coverUrl: this.comic.coverUrl,
    });
  }

  private setInitialValues(): void {
    this.formatList = ['manga', 'manhua', 'manhwa', 'webtoon'];
    this.statusList = ['reading', 'paused', 'planning', 'completed'];
    this.previewImageSrc = null;
  }

  private setInitialComicFormValues(): void {
    this.comicForm = this.fb.group({
      title: ['', { validators: Validators.required, updateOn: 'blur' }],
      format: ['' as ComicFormat, Validators.required],
      status: ['' as ComicStatus, Validators.required],
      chapter: [
        '',
        {
          validators: [Validators.required, comicChapterValidator()],
          updateOn: 'blur',
        },
      ],
      coverUrl: [
        '',
        {
          validators: [Validators.required, webUrlValidator()],
        },
      ],
    });
  }
}
