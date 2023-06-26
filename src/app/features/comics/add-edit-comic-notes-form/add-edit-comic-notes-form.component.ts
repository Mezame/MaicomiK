import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Comic, ComicNotesForm, ComicNotesFormValue } from '../models';

@Component({
  selector: 'app-add-edit-comic-notes-form',
  templateUrl: './add-edit-comic-notes-form.component.html',
  styleUrls: ['./add-edit-comic-notes-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditComicNotesFormComponent implements OnInit {
  comicNotesForm!: ComicNotesForm;

  @Input('data') comic!: Readonly<Comic>;
  @Input() action!: string;

  @Output() actionEvent = new EventEmitter<{
    action: string;
    data: {
      comicNotesFormValue: ComicNotesFormValue;
      isComicNotesFormValid: boolean;
      isComicNotesFormDirty?: boolean;
      originalComic: Readonly<Comic>;
    };
  }>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.setInitialComicNotesFormValues();

    if (this.action == 'editComicNotes' && this.comic.notes) {
      this.setCurrentComicNotesFormValues();
    }
  }

  emitAddComicNotes(
    comicNotesFormValue: ComicNotesFormValue,
    originalComic: Readonly<Comic>,
    isComicNotesFormValid = false
  ) {
    const action = 'addComicNotes';
    const data = {
      comicNotesFormValue,
      isComicNotesFormValid,
      originalComic,
    };

    this.actionEvent.emit({ action, data });
  }

  emitEditComicNotes(
    comicNotesFormValue: ComicNotesFormValue,
    originalComic: Readonly<Comic>,
    isComicNotesFormValid = false,
    isComicNotesFormDirty = false
  ) {
    const action = 'editComicNotes';
    const data = {
      comicNotesFormValue,
      isComicNotesFormValid,
      isComicNotesFormDirty,
      originalComic,
    };

    this.actionEvent.emit({ action, data });
  }

  onValueChanges() {
    this.tryToEmitAddComicNotes();
    this.tryToEmitEditComicNotes();
  }

  private setCurrentComicNotesFormValues() {
    this.comicNotesForm.patchValue(this.comic.notes!);
  }

  private setInitialComicNotesFormValues() {
    this.comicNotesForm = this.fb.control('', Validators.required);
  }

  private tryToEmitAddComicNotes() {
    let comicNotesFormValue: ComicNotesFormValue;
    let isComicNotesFormValid: boolean;

    comicNotesFormValue = this.comicNotesForm.value;
    isComicNotesFormValid = this.comicNotesForm.valid;

    if (this.action == 'addComicNotes') {
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

  private tryToEmitEditComicNotes() {
    let comicNotesFormValue: ComicNotesFormValue;
    let isComicNotesFormValid: boolean;
    let isComicNotesFormDirty: boolean;

    comicNotesFormValue = this.comicNotesForm.value;
    isComicNotesFormValid = this.comicNotesForm.valid;
    isComicNotesFormDirty = this.comicNotesForm.dirty;

    if (this.action == 'editComicNotes') {
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
}
