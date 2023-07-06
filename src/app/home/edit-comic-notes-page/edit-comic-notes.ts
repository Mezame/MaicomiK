import { ApiStateServices } from '@core/services/app-store';
import { Comic } from '@features/comics/models';
import { Observable } from 'rxjs';

export interface EditComicNotesServices extends Partial<ApiStateServices> {
  editComicNotes(comic: Comic): void;
  getComic(comicUrlSegment: string): Observable<Readonly<Comic>>;
  loadComics(): void;
}
