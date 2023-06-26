import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { webUrlValidator } from '@shared/validators/web-url-validator';
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
export class AddEditComicReadersFormComponent {
  comicReadersFormArray!: ComicReadersFormArray;

  @Input('data') comic!: Readonly<Comic>;
  @Input() container!: string;

  @Output() eventBus!: EventEmitter<AddEditComicReadersEvent>;

  constructor(private fb: FormBuilder) {}

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
      this.container == 'editComicReaders' &&
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
    let eventName: string;
    let data: AddEditComicReadersEvent['data'];
    let event: AddEditComicReadersEvent;

    eventName = 'addComicReaders';
    data = {
      comicReadersFormValue,
      isComicReadersFormValid,
      originalComic,
    };
    event = { name: eventName, data };

    this.eventBus.emit(event);
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
    this.comicReadersFormArray = this.fb.array([newComicReadersForm]);

    this.eventBus = new EventEmitter<AddEditComicReadersEvent>();
  }
}
