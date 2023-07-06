import { ApiState } from '@core/services/app-store.service';
import { Comic, ComicFormValue } from '@features/comics/models';
import { Observable } from 'rxjs';

export interface AddComicServices {
  addComic(comic: Partial<Comic>): void;
  clearApiState(): void;
  formatComicChapter(comicFormValue: ComicFormValue): Comic;
  getApiState(): Observable<ApiState>;
  loadComics(): void;
}
