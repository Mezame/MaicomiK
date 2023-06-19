import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder, Validators
} from '@angular/forms';
import { webUrlValidator } from '@shared/validators/web-url-validator';
import * as _ from 'lodash';
import { Comic, ComicFormat, ComicStatus } from '../comic';
import { ComicForm, ComicFormValue } from './comic-form-value';

@Component({
  selector: 'app-comic-add-edit-form',
  templateUrl: './comic-add-edit-form.component.html',
  styleUrls: ['./comic-add-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicAddEditFormComponent implements OnInit {
  formatList: ComicFormat[];
  statusList: ComicStatus[];
  previewImageSrc: string | null;
  currentComicFormValue!: Partial<ComicFormValue>;
  comicForm!: ComicForm;

  @Input('data') comic!: Readonly<Comic>;

  @Input() action!: string;

  @Output() actionEvent = new EventEmitter<{
    action: string;
    data: {
      comicFormValue: Readonly<ComicFormValue>;
      isComicFormValid: boolean;
      isComicFormDirty?: boolean;
      hasChanges?: boolean;
      originalComic?: Readonly<Comic>;
    };
  }>();

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
    this.setInitialValues();

    if (this.action == 'editComic') {
      this.setCurrentValues();

      this.currentComicFormValue = { ...this.comicForm.value };

      this.setPreviewImageSrc();
    }

    this.comicForm.valueChanges.subscribe((_) => {
      this.onValueChanges();
    });
  }

  setInitialValues() {
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

  setCurrentValues() {
    this.comicForm.patchValue({
      title: this.comic.title,
      format: this.comic.format,
      status: this.comic.status,
      chapter: this.comic.chapter?.toString(),
      coverUrl: this.comic.coverUrl,
    });
  }

  setPreviewImageSrc() {
    this.previewImageSrc = this.comicForm.value.coverUrl!;
  }

  onValueChanges() {
    let comicFormValue: Readonly<ComicFormValue>;
    let isComicFormValid: boolean;
    let isComicFormDirty: boolean;
    let hasChanges: boolean;

    comicFormValue = { ...this.comicForm.value } as Readonly<ComicFormValue>;
    isComicFormValid = this.comicForm.valid;
    isComicFormDirty = this.comicForm.dirty;

    if (this.action == 'addComic') {
      if (!isComicFormValid) {
        this.emitAddComic({} as any, isComicFormValid);

        return;
      }

      this.emitAddComic(comicFormValue, isComicFormValid);
    }

    if (this.action == 'editComic') {
      hasChanges = !_.isEqual(comicFormValue, this.currentComicFormValue);

      if (!isComicFormValid || !isComicFormDirty || !hasChanges) {
        this.emitEditComic(
          {} as any,
          isComicFormValid,
          isComicFormDirty,
          hasChanges
        );

        return;
      }

      this.emitEditComic(
        comicFormValue,
        isComicFormValid,
        isComicFormDirty,
        hasChanges
      );
    }
  }

  emitAddComic(
    comicFormValue: Readonly<ComicFormValue>,
    isComicFormValid = false
  ) {
    const action = 'addComic';
    const data = {
      comicFormValue,
      isComicFormValid,
    };

    this.actionEvent.emit({ action, data });
  }

  emitEditComic(
    comicFormValue: Readonly<ComicFormValue>,
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
      originalComic: this.comic,
    };

    this.actionEvent.emit({
      action,
      data,
    });
  }
}
