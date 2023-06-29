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
import { webUrlValidator } from '@shared/validators';
import {
  AddEditComicReadersEvent,
  Comic,
  ComicReadersForm,
  ComicReadersFormArray,
  ComicReadersFormValue,
} from '../models';

@Component({
  selector: 'app-add-edit-comic-readers-form',
  templateUrl: './add-edit-comic-readers-form.component.html',
  styleUrls: ['./add-edit-comic-readers-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditComicReadersFormComponent
  implements EventBusEmitter, OnInit
{
  comic!: Readonly<Comic>;
  comicReadersFormArray!: ComicReadersFormArray;

  @Input('eventBus')
  incomingEvent!: EventBus;

  @Output('eventBus')
  outgoingEvent: EventEmitter<EventBus>;

  constructor(private fb: FormBuilder) {
    this.outgoingEvent = new EventEmitter();
  }

  get comicReadersFormArrayCtrl() {
    return this.comicReadersFormArray.controls;
  }

  get comicReadersFormArrayCount() {
    return this.comicReadersFormArray.length;
  }

  ngOnInit(): void {
    const newComicReadersForm = this.createComicReadersForm();

    this.setInitialValues(newComicReadersForm);

    if (
      this.incomingEvent?.name == 'editComicReaders' &&
      this.comic.readers &&
      this.comic.readers.length > 0
    ) {
      this.setCurrentComicReadersFormValues(newComicReadersForm);
    }
  }

  addComicReadersForm(): void {
    const newComicReadersForm = this.createComicReadersForm();

    this.comicReadersFormArray.push(newComicReadersForm);

    this.tryToEmitAddComicReaders();
  }

  emitAddComicReaders(
    comicReadersFormValue: ComicReadersFormValue[],
    originalComic: Readonly<Comic>,
    isComicReadersFormValid = false
  ) {
    let eventName: EventBus['name'];
    let data: AddEditComicReadersEvent['data'];
    let event: AddEditComicReadersEvent;

    eventName = 'addComicReaders';
    data = {
      comicReadersFormValue,
      isComicReadersFormValid,
      originalComic,
    };
    event = { name: eventName, data };

    this.emitEvent(event);
  }

  emitEvent(event: EventBus): void {
    this.outgoingEvent.emit(event);
  }

  onComicReadersFormValueChanges(): void {
    this.tryToEmitAddComicReaders();
  }

  onRemoveComicReaders(index: number): void {
    this.comicReadersFormArray.removeAt(index);

    this.tryToEmitAddComicReaders();
  }

  tryToEmitAddComicReaders(): void {
    let comicReadersFormValue: ComicReadersFormValue[];
    let isComicReadersFormValid: boolean;

    comicReadersFormValue = [
      ...this.comicReadersFormArray.value,
    ] as ComicReadersFormValue[];
    isComicReadersFormValid = this.comicReadersFormArray.valid;

    if (!isComicReadersFormValid) {
      this.emitAddComicReaders([], {} as any, isComicReadersFormValid);

      return;
    }

    this.emitAddComicReaders(
      comicReadersFormValue,
      this.comic,
      isComicReadersFormValid
    );
  }

  private createComicReadersForm(): ComicReadersForm {
    let comicReadersForm: ComicReadersForm;

    comicReadersForm = this.fb.group({
      name: ['', Validators.required],
      url: [null as ComicReadersFormValue['url'], webUrlValidator()],
    });

    return comicReadersForm;
  }

  private setCurrentComicReadersFormValues(
    comicReadersForm: ComicReadersForm
  ): void {
    for (let i = 0; i < this.comic.readers!.length; i++) {
      comicReadersForm.patchValue({
        name: this.comic.readers![i].name,
        url: this.comic.readers![i].url,
      });

      if (i < 1) {
        this.comicReadersFormArrayCtrl[0] = comicReadersForm;
      } else {
        this.comicReadersFormArray.push(comicReadersForm);
      }
    }
  }

  private setInitialValues(newComicReadersForm: ComicReadersForm): void {
    this.comic = this.incomingEvent?.data;
    this.comicReadersFormArray = this.fb.array([newComicReadersForm]);
  }
}
