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
      originalComic: Readonly<Comic>;
    };
  }>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.comicNotesForm = this.fb.control('', Validators.required);
  }

  onValueChanges() {
    let comicNotesFormValue: string | null;
    let isComicNotesFormValid: boolean;

    comicNotesFormValue = this.comicNotesForm.value;
    isComicNotesFormValid = this.comicNotesForm.valid;

    if (this.action == 'addComicNotes') {
      if (!isComicNotesFormValid) {
        this.emitAddComicNotes('', isComicNotesFormValid);

        return;
      }

      this.emitAddComicNotes(comicNotesFormValue, isComicNotesFormValid);
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
}
