import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  AddEditComicNotesEvent,
  Comic,
  ComicNotesForm,
  ComicNotesFormValue,
} from '../models';
import { EventBus, EventBusEmitter } from '@shared/models';

@Component({
  selector: 'app-add-edit-comic-notes-form',
  templateUrl: './add-edit-comic-notes-form.component.html',
  styleUrls: ['./add-edit-comic-notes-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditComicNotesFormComponent implements EventBusEmitter, OnInit {
  comic!: Readonly<Comic>;
  comicNotesForm!: ComicNotesForm;

  @Input('eventBus') 
  incomingEvent!: EventBus;

  @Output('eventBus') 
  outgoingEvent: EventEmitter<EventBus>;

  constructor(private fb: FormBuilder) {
    this.outgoingEvent = new EventEmitter();
  }

  ngOnInit(): void {
    this.setInitialValues();

    this.setInitialComicNotesFormValues();

    if (this.incomingEvent?.name == 'editComicNotes' && this.comic.notes) {
      this.setCurrentComicNotesFormValues();
    }
  }

  emitAddComicNotes(
    comicNotesFormValue: ComicNotesFormValue,
    originalComic: Readonly<Comic>,
    isComicNotesFormValid = false
  ): void {
    let eventName: EventBus['name'];
    let data: AddEditComicNotesEvent['data'];
    let event: AddEditComicNotesEvent;

    eventName = 'addComicNotes';
    data = {
      comicNotesFormValue,
      isComicNotesFormValid,
      originalComic,
    };
    event = { name: eventName, data };

    this.emitEvent(event);
  }

  emitEditComicNotes(
    comicNotesFormValue: ComicNotesFormValue,
    originalComic: Readonly<Comic>,
    isComicNotesFormValid = false,
    isComicNotesFormDirty = false
  ): void {
    let eventName: EventBus['name'];
    let data: AddEditComicNotesEvent['data'];
    let event: AddEditComicNotesEvent;

    eventName = 'addComicNotes';
    data = {
      comicNotesFormValue,
      isComicNotesFormValid,
      isComicNotesFormDirty,
      originalComic,
    };
    event = { name: eventName, data };

    this.emitEvent(event);
  }

  emitEvent(event: EventBus): void {
    this.outgoingEvent.emit(event);
  }

  onComicNotesFormValueChanges(): void {
    this.tryToEmitAddComicNotes();

    this.tryToEmitEditComicNotes();
  }

  tryToEmitAddComicNotes(): void {
    let comicNotesFormValue: ComicNotesFormValue;
    let isComicNotesFormValid: boolean;

    comicNotesFormValue = this.comicNotesForm.value;
    isComicNotesFormValid = this.comicNotesForm.valid;

    if (this.incomingEvent?.name == 'addComicNotes') {
      if (!isComicNotesFormValid) {
        this.emitAddComicNotes('', {} as any, isComicNotesFormValid);

        return;
      }

      this.emitAddComicNotes(
        comicNotesFormValue,
        this.comic,
        isComicNotesFormValid
      );
    }
  }

  tryToEmitEditComicNotes(): void {
    let comicNotesFormValue: ComicNotesFormValue;
    let isComicNotesFormValid: boolean;
    let isComicNotesFormDirty: boolean;

    comicNotesFormValue = this.comicNotesForm.value;
    isComicNotesFormValid = this.comicNotesForm.valid;
    isComicNotesFormDirty = this.comicNotesForm.dirty;

    if (this.incomingEvent?.name == 'editComicNotes') {
      if (!isComicNotesFormValid || !isComicNotesFormDirty) {
        this.emitEditComicNotes(
          '',
          {} as any,
          isComicNotesFormValid,
          isComicNotesFormDirty
        );

        return;
      }

      this.emitEditComicNotes(
        comicNotesFormValue,
        this.comic,
        isComicNotesFormValid,
        isComicNotesFormDirty
      );
    }
  }

  private setCurrentComicNotesFormValues(): void {
    this.comicNotesForm.patchValue(this.comic.notes!);
  }

  private setInitialComicNotesFormValues(): void {
    this.comicNotesForm = this.fb.control('', Validators.required);
  }

  private setInitialValues(): void {
    this.comic = this.incomingEvent?.data;
  }
}
