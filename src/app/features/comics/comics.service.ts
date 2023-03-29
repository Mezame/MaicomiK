import { Injectable } from '@angular/core';
import { LoggerService } from '@core/logger/logger.service';
import {
  FirebaseErrorHandlerService,
  HandleError,
} from '@shared/firebase/firebase-error-handler.service';
import {
  FirestoreResponse,
  FirestoreService,
} from '@shared/firebase/firestore.service';
import { catchError, from, map, tap } from 'rxjs';
import { Comic } from './comic';
import { ComicsStoreService } from './comics-store.service';

@Injectable({
  providedIn: 'root',
})
export class ComicsService {
  private path: string;
  private handleError: HandleError;

  constructor(
    private firestoreService: FirestoreService,
    private firebaseErrorHandlerService: FirebaseErrorHandlerService,
    private comicsStoreService: ComicsStoreService,
    private loggerService: LoggerService
  ) {
    const id = 'ynYZI4n3XarUz7tlW4zU68uHSm25';

    this.path = `users/${id}/comics`;
    this.handleError =
      this.firebaseErrorHandlerService.createHandleError('ComicsService');
  }

  getComics() {
    return this.firestoreService.getCollection(this.path).pipe(
      map((docData) => docData as readonly Comic[]),
      tap((comics) => {
        this.loggerService.log(
          `ComicsServiceService: getComics: got ${comics.length} comics`
        );
      }),
      catchError(this.handleError<readonly Comic[]>('getComics', []))
    );
  }

  addComic(comic: Partial<Comic>) {
    const newComic = this.addMetadataUrlSegment(comic);

    return from(
      this.firestoreService.setDocumentNoId(this.path, newComic)
    ).pipe(
      tap((res) => {
        if (res.error) {
          this.comicsStoreService.setApiState({
            operation: 'addComic',
            status: 'failure',
          });

          throw res.error;
        }

        this.comicsStoreService.setApiState({
          operation: 'addComic',
          status: 'success',
        });

        this.loggerService.log('ComicsServiceService: addComic: added comic');
      }),
      catchError(this.handleError<FirestoreResponse>('addComic'))
    );
  }

  updateComic(comic: Readonly<Comic>) {
    const id = comic.metadata!.id;

    return from(
      this.firestoreService.updateDocument(this.path, id, comic)
    ).pipe(
      tap((res) => {
        if (res.error) {
          this.comicsStoreService.setApiState({
            operation: 'updateComic',
            status: 'failure',
          });

          throw res.error;
        }

        this.comicsStoreService.setApiState({
          operation: 'updateComic',
          status: 'success',
        });

        this.loggerService.log(
          'ComicsServiceService: updateComic: updated comic'
        );
      }),
      catchError(this.handleError<FirestoreResponse>('updateComic'))
    );
  }

  private addMetadataUrlSegment(comic: Partial<Comic>) {
    let comicWithMetadataUrlSegment: Readonly<Comic>;
    let urlSegment: string;
    const metadata = {
      id: '',
      createdAt: null,
      updatedAt: null,
      urlSegment: '',
    };

    urlSegment = comic.title!
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .replace(/ /g, '-');
    metadata.urlSegment = urlSegment;
    comicWithMetadataUrlSegment = { ...comic, metadata } as Readonly<Comic>;

    return comicWithMetadataUrlSegment;
  }
}
