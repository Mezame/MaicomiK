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

  @Input() action!: string;

  @Output() actionEvent = new EventEmitter<{
    action: string;
    data: {
      comicReadersFormValue: ComicReadersFormValue[];
      isComicReadersFormValid: boolean;
      originalComic: Readonly<Comic>;
    };
  }>();

  constructor(private fb: FormBuilder) {}

  get comicReadersFormArrayCtrl() {
    return this.comicReadersFormArray.controls;
  }

  get comicReadersFormArrayCount() {
    return this.comicReadersFormArray.length;
  }

  ngOnInit(): void {
    const newComicReadersForm = this.createComicReadersForm();

    this.comicReadersFormArray = this.fb.array([newComicReadersForm]);

    if (
      this.action == 'editComicReaders' &&
      this.comic.readers &&
      this.comic.readers.length > 0
    ) {
      this.setCurrentValues(newComicReadersForm);
    }
  }

  addComicReadersForm() {
    const newComicReadersForm = this.createComicReadersForm();

    this.comicReadersFormArray.push(newComicReadersForm);

    this.tryToEmitAddComicReaders();
  }

  emitAddComicReaders(
    comicReadersFormValue: ComicReadersFormValue[],
    originalComic: Readonly<Comic>,
    isComicReadersFormValid = false
  ) {
    const action = 'addComicReaders';
    const data = {
      comicReadersFormValue,
      isComicReadersFormValid,
      originalComic,
    };

    this.actionEvent.emit({ action, data });
  }

  onValueChanges() {
    this.tryToEmitAddComicReaders();
  }

  removeComicReadersForm(index: number) {
    this.comicReadersFormArray.removeAt(index);

    this.tryToEmitAddComicReaders();
  }

  private createComicReadersForm() {
    let comicReadersForm: ComicReadersForm;

    comicReadersForm = this.fb.group({
      name: ['', Validators.required],
      url: [null as any, webUrlValidator()],
    });

    return comicReadersForm;
  }

  private setCurrentValues(comicReadersForm: ComicReadersForm) {
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

  private tryToEmitAddComicReaders() {
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
}
