import { ComicFormat, ComicStatus } from '../comic';

export interface ComicFormValue {
  title: string | null;
  format: ComicFormat | string | null;
  status: ComicStatus | string | null;
  chapter: string | null;
  coverUrl: string | null;
}
