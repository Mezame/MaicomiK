import { ApiStateServices } from '@core/services/app-store';
import { Comic, ComicFormValue } from '@features/comics/models';
import { Observable } from 'rxjs';

export interface EditComicServices extends Partial<ApiStateServices> {
  editComic(editedComic: Readonly<Comic>): void;
  formatComicChapter(comicFormValue: ComicFormValue): Comic;
  getComic(comicUrlSegment: string): Observable<Readonly<Comic>>;
  loadComics(): void;
}
