import { Comic } from './comic';
import { ComicFormValue } from './comic-form';

interface ActionEvent {
  action: string;
  data: {};
}

export interface AddEditComicActionEvent extends ActionEvent {
  data: {
    comicFormValue: ComicFormValue;
    isComicFormValid: boolean;
    hasChanges?: boolean;
    isComicFormDirty?: boolean;
    originalComic?: Readonly<Comic>;
  };
}
