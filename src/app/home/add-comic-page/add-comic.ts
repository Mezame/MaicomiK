import { ApiState } from '@core/app-store';
import { Comic, ComicFormValue } from '@features/comics/models';
import { Observable } from 'rxjs';

export interface AddComicServices {
  addComic(comic: Partial<Comic>): void;
  clearApiState(): void;
  formatComicChapter(comicFormValue: ComicFormValue): Comic;
  getApiState(): Observable<ApiState>;
  loadComics(): void;
}
