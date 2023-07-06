import { Comic } from '@features/comics/models';
import { Observable } from 'rxjs';

export interface ComicListServices {
  clearApiState(): void;
  getComics(): Observable<readonly Comic[]>;
  incrementComicChapter(
    comic: Readonly<Comic>,
    comicFields: Partial<Comic>
  ): void;
  loadComics(): void;
}
