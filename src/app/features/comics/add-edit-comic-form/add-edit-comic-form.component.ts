import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { webUrlValidator } from '@shared/validators/web-url-validator';
import * as _ from 'lodash';
import {
  AddEditComicEvent,
  Comic,
  ComicForm,
  ComicFormValue,
  ComicFormat,
  ComicStatus,
} from '../models';

@Component({
  selector: 'app-add-edit-comic-form',
  templateUrl: './add-edit-comic-form.component.html',
  styleUrls: ['./add-edit-comic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditComicFormComponent implements OnInit {
  comicForm!: ComicForm;
  currentComicFormValue!: Partial<ComicFormValue>;
  formatList!: ComicFormat[];
  statusList!: ComicStatus[];
  previewImageSrc!: string | null;

  @Input('data') comic!: Readonly<Comic>;
  @Input() container!: string;

  @Output() eventBus!: EventEmitter<AddEditComicEvent>;

  constructor(private fb: FormBuilder) {}

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

    if (this.container == 'editComicPage') {
      this.setCurrentComicFormValues();

      this.currentComicFormValue = { ...this.comicForm.value };

      this.setPreviewImageSrc();
    }

    this.comicForm.valueChanges.subscribe((_) => {
      this.onComicFormValueChanges();
    });
  }

  emitAddComic(comicFormValue: ComicFormValue, isComicFormValid = false): void {
    let eventName: string;
    let data: AddEditComicEvent['data'];
    let event: AddEditComicEvent;

    eventName = 'addComic';
    data = {
      comicFormValue,
      isComicFormValid,
    };
    event = { name: eventName, data };

    this.eventBus.emit(event);
  }

  emitEditComic(
    comicFormValue: ComicFormValue,
    originalComic: Readonly<Comic>,
    isComicFormValid = false,
    isComicFormDirty = false,
    hasChanges = false
  ): void {
    let eventName: string;
    let data: AddEditComicEvent['data'];
    let event: AddEditComicEvent;

    eventName = 'editComic';
    data = {
      comicFormValue,
      isComicFormValid,
      isComicFormDirty,
      hasChanges,
      originalComic,
    };
    event = { name: eventName, data };

    this.eventBus.emit(event);
  }

  tryToEmitAddComic(): void {
    let comicFormValue: ComicFormValue;
    let isComicFormValid: boolean;

    comicFormValue = { ...this.comicForm.value } as ComicFormValue;
    isComicFormValid = this.comicForm.valid;

    if (this.container == 'addComicPage') {
      if (!isComicFormValid) {
        this.emitAddComic({} as any, isComicFormValid);

        return;
      }

      this.emitAddComic(comicFormValue, isComicFormValid);
    }
  }

  tryToEmitEditComic(): void {
    let comicFormValue: ComicFormValue;
    let isComicFormValid: boolean;
    let isComicFormDirty: boolean;
    let hasChanges: boolean;

    comicFormValue = { ...this.comicForm.value } as ComicFormValue;
    isComicFormValid = this.comicForm.valid;
    isComicFormDirty = this.comicForm.dirty;

    if (this.container == 'editComicPage') {
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
  }

  private onComicFormValueChanges(): void {
    this.tryToEmitAddComic();

    this.tryToEmitEditComic();
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

    this.eventBus = new EventEmitter<AddEditComicEvent>();
  }

  private setInitialComicFormValues(): void {
    this.comicForm = this.fb.group({
      title: ['', { validators: Validators.required, updateOn: 'blur' }],
      format: ['' as ComicFormat, Validators.required],
      status: ['' as ComicStatus, Validators.required],
      chapter: [
        '',
        {
          validators: [
            Validators.required,
            Validators.pattern('^[0-9]\\d*(\\.\\d+)?$'),
          ],
          updateOn: 'blur',
        },
      ],
      coverUrl: [
        '',
        {
          validators: [Validators.required, webUrlValidator()],
          updateOn: 'blur',
        },
      ],
    });
  }

  private setPreviewImageSrc(): void {
    this.previewImageSrc = this.comicForm.value.coverUrl!;
  }
}
