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

@Component({
  selector: 'app-comic-add-edit-form',
  templateUrl: './comic-add-edit-form.component.html',
  styleUrls: ['./comic-add-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicAddEditFormComponent implements OnInit {
  formatList: ComicFormat[];
  statusList: ComicStatus[];
  imageSrc: string | null;

  comicForm!: FormGroup<{
    title: FormControl<string | null>;
    format: FormControl<string | null>;
    status: FormControl<string | null>;
    chapter: FormControl<string | null>;
    coverUrl: FormControl<string | null>;
  }>;

  @Input('data') comic!: Comic;

  @Input() action!: string;

  @Output() actionEvent = new EventEmitter<{
    action: string;
    data: Readonly<ComicFormValue>;
    isFormValid: boolean;
  }>();

  constructor(private fb: FormBuilder) {
    this.formatList = ['manga', 'manhua', 'manhwa', 'webtoon'];
    this.statusList = ['reading', 'paused', 'planning', 'completed'];
    this.imageSrc = null;
  }

  ngOnInit(): void {
    this.comicForm = this.fb.group({
      title: ['', Validators.required],
      format: ['', Validators.required],
      status: ['', Validators.required],
      chapter: ['', Validators.required],
      coverUrl: ['', Validators.required],
    });
  }

  onValueChange() {
    let comicFormValue: Readonly<ComicFormValue>;
    let isComicFormValid: boolean;
    let isComicFormDirty: boolean;

    comicFormValue = { ...this.comicForm.value } as Readonly<ComicFormValue>;
    isComicFormValid = this.comicForm.valid;
    isComicFormDirty = this.comicForm.dirty;

    if (!isComicFormValid) {
      this.emitAddComic({} as any, isComicFormValid);

      return;
    }

    this.emitAddComic(comicFormValue, isComicFormValid);
  }

  emitAddComic(data: Readonly<ComicFormValue>, isFormValid = false) {
    const action = 'addComic';

    this.actionEvent.emit({ action, data, isFormValid });
  }

  setImageSrc() {
    this.imageSrc = this.comicForm.value.coverUrl!;
  }
}
