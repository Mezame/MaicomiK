import { ApiStateServices } from '@core/services/app-store';
import { Comic } from '@features/comics/models';
import { Observable } from 'rxjs';

export interface EditComicReadersServices extends Partial<ApiStateServices> {
  editComicReaders(comic: Comic): void;
  getComic(comicUrlSegment: string): Observable<Readonly<Comic>>;
  loadComics(): void;
}
