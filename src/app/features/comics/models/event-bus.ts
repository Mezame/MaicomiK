import { Comic } from './comic';
import { ComicFormValue } from './comic-form';

interface EventBus {
  name: string;
  data?: {};
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
