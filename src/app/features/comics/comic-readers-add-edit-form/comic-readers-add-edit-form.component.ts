import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ComicReadersFormValue } from './comic-readers-form-value';
import { webUrlValidator } from '@shared/validators/web-url-validator';
import { Comic } from '../comic';

@Component({
  selector: 'app-comic-readers-add-edit-form',
  templateUrl: './comic-readers-add-edit-form.component.html',
  styleUrls: ['./comic-readers-add-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicReadersAddEditFormComponent {
  comicReadersFormArray!: FormArray<
    FormGroup<{
      name: FormControl<string | null>;
      link: FormControl<string | null>;
    }>
  >;

  @Input('data') comic!: Readonly<Comic>;

  @Input() action!: string;

  @Output() actionEvent = new EventEmitter<{
    action: string;
    data: {
      comicReadersFormValue: readonly ComicReadersFormValue[];
      isComicReadersFormValid: boolean;
      originalComic: Readonly<Comic>;
    };
  }>();

  constructor(private fb: FormBuilder) {}

  get cRSArrayCtrl() {
    return this.comicReadersFormArray.controls;
  }

  ngOnInit(): void {
    const newComicReadersForm = this.createComicReadersForm();

    this.comicReadersFormArray = this.fb.array([newComicReadersForm]);
  }

  addComicReadersForm() {
    const newComicReadersForm = this.createComicReadersForm();

    this.comicReadersFormArray.push(newComicReadersForm);

    this.onValueChanges();
  }

  removeComicReadersForm(index: number) {
    this.comicReadersFormArray.removeAt(index);

    this.onValueChanges();
  }

  onValueChanges() {
    let comicReadersFormValue: readonly ComicReadersFormValue[];
    let isComicReadersFormValid: boolean;

    comicReadersFormValue = [
      ...this.comicReadersFormArray.value,
    ] as readonly ComicReadersFormValue[];
    isComicReadersFormValid = this.comicReadersFormArray.valid;

    if (!isComicReadersFormValid) {
      this.emitAddComicReaders([], isComicReadersFormValid);

      return;
    }

    this.emitAddComicReaders(comicReadersFormValue, isComicReadersFormValid);
  }

  emitAddComicReaders(
    comicReadersFormValue: readonly ComicReadersFormValue[],
    isComicReadersFormValid = false
  ) {
    const action = 'addComicReaders';
    const data = {
      comicReadersFormValue,
      isComicReadersFormValid,
      originalComic: this.comic,
    };

    this.actionEvent.emit({ action, data });
  }

  private createComicReadersForm() {
    let comicReadersForm: FormGroup<{
      name: FormControl<string | null>;
      link: FormControl<string | null>;
    }>;

    comicReadersForm = this.fb.group({
      name: ['', Validators.required],
      link: [null as any, webUrlValidator()],
    });

    return comicReadersForm;
  }
}
