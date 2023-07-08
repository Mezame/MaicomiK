import { ApiState } from '@core/services/app-store';
import { Comic } from '@features/comics/models';
import { Observable } from 'rxjs';

export interface ComicDetailServices {
  clearApiState(): void;
  deleteComic(comicId: string): void;
  deleteComicNotes(comic: Readonly<Comic>, comicFields: Partial<Comic>): void;
  deleteComicReaders(comic: Readonly<Comic>, comicFields: Partial<Comic>): void;
  getApiState(): Observable<ApiState>;
  incrementComicChapter(
    comic: Readonly<Comic>,
    comicFields: Partial<Comic>
  ): void;
  loadComics(): void;
}
