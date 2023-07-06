import { ApiState } from "@core/services/app-store.service";
import { Comic } from "@features/comics/models";
import { Observable } from "rxjs";

export interface AddComicReadersServices {
    addComicReaders(comic: Comic): void
    clearApiState(): void;
    getApiState(): Observable<ApiState>;
    getComic(comicUrlSegment: string): Observable<Readonly<Comic>>;
    loadComics(): void;
  }