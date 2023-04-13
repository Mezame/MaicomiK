import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Comic, ComicFormat, ComicStatus } from '../comic';
import { ComicFormValue } from './comic-form-value';
import { webUrlValidator } from '@shared/validators/web-url-validator';

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

  comicForm!: FormGroup<{
    title: FormControl<ComicFormValue['title']>;
    format: FormControl<ComicFormValue['format']>;
    status: FormControl<ComicFormValue['status']>;
    chapter: FormControl<ComicFormValue['chapter']>;
    coverUrl: FormControl<ComicFormValue['coverUrl']>;
  }>;

  @Input('data') comic!: Readonly<Comic>;

  @Input() action!: string;

  @Output() actionEvent = new EventEmitter<{
    action: string;
    data: {
      comicFormValue: Readonly<ComicFormValue>;
      isComicFormValid: boolean;
      isComicFormDirty?: boolean;
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
    this.comicForm = this.fb.group({
      title: ['', Validators.required],
      format: ['', Validators.required],
      status: ['', Validators.required],
      chapter: [
        '',
        [Validators.required, Validators.pattern('^[0-9]\\d*(\\.\\d+)?$')],
      ],
      coverUrl: ['', [Validators.required, webUrlValidator()]],
    });

    if (this.action == 'editComic') {
      this.comicForm.patchValue({
        title: this.comic.title,
        format: this.comic.format,
        status: this.comic.status,
        chapter: this.comic.chapter?.toString(),
        coverUrl: this.comic.coverUrl,
      });

      this.setPreviewImageSrc();
    }
  }

  onValueChanges() {
    let comicFormValue: Readonly<ComicFormValue>;
    let isComicFormValid: boolean;
    let isComicFormDirty: boolean;

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
      if (!isComicFormValid || !isComicFormDirty) {
        this.emitEditComic({} as any, isComicFormValid, isComicFormDirty);

        return;
      }

      /* ToDo: Check if updated value is different from the current value */
      this.emitEditComic(comicFormValue, isComicFormValid, isComicFormDirty);
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
    isComicFormDirty = false
  ) {
    const action = 'editComic';
    const data = {
      comicFormValue,
      isComicFormValid,
      isComicFormDirty,
      originalComic: this.comic,
    };

    this.actionEvent.emit({
      action,
      data,
    });
  }

  setPreviewImageSrc() {
    this.previewImageSrc = this.comicForm.value.coverUrl!;
  }
}
