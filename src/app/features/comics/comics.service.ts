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
import { ApiState, ComicsStoreService } from './comics-store.service';

@Injectable({
  providedIn: 'root',
})
export class ComicsService {
  private path: string;
  private serviceName: string;
  private handleError: HandleError;

  constructor(
    private firestoreService: FirestoreService,
    private firebaseErrorHandlerService: FirebaseErrorHandlerService,
    private comicsStoreService: ComicsStoreService,
    private loggerService: LoggerService
  ) {
    const id = 'ynYZI4n3XarUz7tlW4zU68uHSm25';

    this.path = `users/${id}/comics`;
    this.serviceName = 'ComicsService';
    this.handleError = this.firebaseErrorHandlerService.createHandleError(
      this.serviceName
    );
  }

  getComics() {
    const operation = 'getComics';

    return this.firestoreService.getCollection(this.path).pipe(
      map((docData) => docData as readonly Comic[]),
      tap((comics) => {
        this.loggerService.log(
          `${this.serviceName}: ${operation}: got ${comics.length} comics`
        );
      }),
      catchError(this.handleError<readonly Comic[]>(operation, []))
    );
  }

  addComic(comic: Partial<Comic>) {
    const newComic = this.addMetadataUrlSegment(comic);
    const operation = 'addComic';

    return from(
      this.firestoreService.setDocumentNoId(this.path, newComic)
    ).pipe(
      tap((res) => {
        if (res.error) {
          this.setApiState(operation, 'failure');

          throw res.error;
        }

        this.setApiState(operation, 'success');

        this.loggerService.log(
          `${this.serviceName}: ${operation}: added comic`
        );
      }),
      catchError(this.handleError<FirestoreResponse>(operation))
    );
  }

  updateComic(comic: Readonly<Comic>) {
    const id = comic.metadata!.id;
    const operation = 'updateComic';

    return from(
      this.firestoreService.updateDocument(this.path, id, comic)
    ).pipe(
      tap((res) => {
        if (res.error) {
          this.setApiState(operation, 'failure');

          throw res.error;
        }

        this.setApiState(operation, 'success');

        this.loggerService.log(
          `${this.serviceName}: ${operation}: updated comic`
        );
      }),
      catchError(this.handleError<FirestoreResponse>(operation))
    );
  }

  patchComic(comic: Readonly<Comic>, fields: Partial<Comic>) {
    const id = comic.metadata!.id;
    const operation = 'patchComic';

    return from(
      this.firestoreService.patchDocument(this.path, id, comic, fields)
    ).pipe(
      tap((res) => {
        if (res.error) {
          this.setApiState(operation, 'failure');

          throw res.error;
        }

        this.setApiState(operation, 'success');

        this.loggerService.log(
          `${this.serviceName}: ${operation}: patched comic`
        );
      }),
      catchError(this.handleError<FirestoreResponse>(operation))
    );
  }

  deleteComic(id: string) {
    const operation = 'deleteComic';

    return from(this.firestoreService.deleteDocument(this.path, id)).pipe(
      tap((res) => {
        if (res.error) {
          this.setApiState(operation, 'failure');

          throw res.error;
        }

        this.setApiState(operation, 'success');

        console.log(`${this.serviceName}: ${operation}: deleted comic`);
      }),
      catchError(this.handleError<FirestoreResponse>(operation))
    );
  }

  private setApiState(operation: string, status: ApiState['status']) {
    this.comicsStoreService.setApiState({
      operation,
      status,
    });
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

    urlSegment = comic
      .title!.toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .replace(/ /g, '-');
    metadata.urlSegment = urlSegment;
    comicWithMetadataUrlSegment = { ...comic, metadata } as Readonly<Comic>;

    return comicWithMetadataUrlSegment;
  }
}
