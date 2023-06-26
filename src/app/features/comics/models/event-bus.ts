import { Comic } from './comic';
import { ComicFormValue } from './comic-form';
import { ComicNotesFormValue } from './comic-notes-form';

export interface EventBus {
  name: string;
  data: any;
}

export interface AddEditComicEvent extends EventBus {
  data: {
    comicFormValue: ComicFormValue;
    isComicFormValid: boolean;
    hasChanges?: boolean;
    isComicFormDirty?: boolean;
    originalComic?: Readonly<Comic>;
  };
}

export interface AddEditComicNotesEvent extends EventBus {
  data: {
    comicNotesFormValue: ComicNotesFormValue;
    isComicNotesFormValid: boolean;
    isComicNotesFormDirty?: boolean;
    originalComic: Readonly<Comic>;
  };
}
