import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Comic } from '../comic';

@Component({
  selector: 'app-comic-notes-add-edit-form',
  templateUrl: './comic-notes-add-edit-form.component.html',
  styleUrls: ['./comic-notes-add-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicNotesAddEditFormComponent {
  comicNotesForm!: FormControl<string | null>;

  @Input('data') comic!: Readonly<Comic>;

  @Input() action!: string;

  @Output() actionEvent = new EventEmitter<{
    action: string;
    data: {
      comicNotesFormValue: string | null;
      isComicNotesFormValid: boolean;
      isComicNotesFormDirty?: boolean;
      originalComic: Readonly<Comic>;
    };
  }>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.comicNotesForm = this.fb.control('', Validators.required);

    if (this.action == 'editComicNotes' && this.comic.notes) {
      this.comicNotesForm.patchValue(this.comic.notes);
    }
  }

  onValueChanges() {
    let comicNotesFormValue: string | null;
    let isComicNotesFormValid: boolean;
    let isComicNotesFormDirty: boolean;

    comicNotesFormValue = this.comicNotesForm.value;
    isComicNotesFormValid = this.comicNotesForm.valid;
    isComicNotesFormDirty = this.comicNotesForm.dirty;

    if (this.action == 'addComicNotes') {
      if (!isComicNotesFormValid) {
        this.emitAddComicNotes('', isComicNotesFormValid);

        return;
      }

      this.emitAddComicNotes(comicNotesFormValue, isComicNotesFormValid);
    }

    if (this.action == 'editComicNotes') {
      if (!isComicNotesFormValid || !isComicNotesFormDirty) {
        this.emitEditComicNotes(
          '',
          isComicNotesFormValid,
          isComicNotesFormDirty
        );

        return;
      }

      this.emitEditComicNotes(
        comicNotesFormValue,
        isComicNotesFormValid,
        isComicNotesFormDirty
      );
    }
  }

  emitAddComicNotes(
    comicNotesFormValue: string | null,
    isComicNotesFormValid = false
  ) {
    const action = 'addComicNotes';
    const data = {
      comicNotesFormValue,
      isComicNotesFormValid,
      originalComic: this.comic,
    };

    this.actionEvent.emit({ action, data });
  }

  emitEditComicNotes(
    comicNotesFormValue: string | null,
    isComicNotesFormValid = false,
    isComicNotesFormDirty = false
  ) {
    const action = 'editComicNotes';
    const data = {
      comicNotesFormValue,
      isComicNotesFormValid,
      isComicNotesFormDirty,
      originalComic: this.comic,
    };

    this.actionEvent.emit({ action, data });
  }
}
