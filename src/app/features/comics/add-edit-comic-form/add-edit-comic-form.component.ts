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
  AddEditComicActionEvent,
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
  formatList: ComicFormat[];
  statusList: ComicStatus[];
  previewImageSrc: string | null;

  @Input('data') comic!: Readonly<Comic>;
  @Input() action!: string;

  @Output() actionEvent = new EventEmitter<AddEditComicActionEvent>();

  constructor(private fb: FormBuilder) {
    this.formatList = ['manga', 'manhua', 'manhwa', 'webtoon'];
    this.statusList = ['reading', 'paused', 'planning', 'completed'];
    this.previewImageSrc = null;
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
    this.setInitialFormValues();

    if (this.action == 'editComic') {
      this.setCurrentValues();

      this.currentComicFormValue = { ...this.comicForm.value };

      this.setPreviewImageSrc();
    }

    this.comicForm.valueChanges.subscribe((_) => {
      this.onComicFormValueChanges();
    });
  }

  emitAddComic(comicFormValue: ComicFormValue, isComicFormValid = false) {
    const action = 'addComic';
    const data = {
      comicFormValue,
      isComicFormValid,
    };

    this.actionEvent.emit({ action, data });
  }

  emitEditComic(
    comicFormValue: ComicFormValue,
    originalComic: Readonly<Comic>,
    isComicFormValid = false,
    isComicFormDirty = false,
    hasChanges = false
  ) {
    const action = 'editComic';
    const data = {
      comicFormValue,
      isComicFormValid,
      isComicFormDirty,
      hasChanges,
      originalComic,
    };

    this.actionEvent.emit({
      action,
      data,
    });
  }

  onComicFormValueChanges() {
    this.tryToEmitAddComic();

    this.tryToEmitEditComic();
  }

  setPreviewImageSrc() {
    this.previewImageSrc = this.comicForm.value.coverUrl!;
  }

  private setCurrentValues() {
    this.comicForm.patchValue({
      title: this.comic.title,
      format: this.comic.format,
      status: this.comic.status,
      chapter: this.comic.chapter?.toString(),
      coverUrl: this.comic.coverUrl,
    });
  }

  private setInitialFormValues() {
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

  private tryToEmitAddComic() {
    let comicFormValue: ComicFormValue;
    let isComicFormValid: boolean;

    comicFormValue = { ...this.comicForm.value } as ComicFormValue;
    isComicFormValid = this.comicForm.valid;

    if (this.action == 'addComic') {
      if (!isComicFormValid) {
        this.emitAddComic({} as any, isComicFormValid);

        return;
      }

      this.emitAddComic(comicFormValue, isComicFormValid);
    }
  }

  private tryToEmitEditComic() {
    let comicFormValue: ComicFormValue;
    let isComicFormValid: boolean;
    let isComicFormDirty: boolean;
    let hasChanges: boolean;

    comicFormValue = { ...this.comicForm.value } as ComicFormValue;
    isComicFormValid = this.comicForm.valid;
    isComicFormDirty = this.comicForm.dirty;

    if (this.action == 'editComic') {
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
}
