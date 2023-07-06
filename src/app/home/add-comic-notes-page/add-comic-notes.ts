import { ApiState, ApiStateServices } from '@core/services/app-store';
import { Comic } from '@features/comics/models';
import { Observable } from 'rxjs';

export interface AddComicNotesServices extends Partial<ApiStateServices> {
  addComicNotes(comic: Comic): void;
  getComic(comicUrlSegment: string): Observable<Readonly<Comic>>;
  loadComics(): void;
}
