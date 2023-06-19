import { FormControl } from "@angular/forms";

export type ComicNotesForm = FormControl<ComicNotesFormValue>;

export type ComicNotesFormValue = string | null;
