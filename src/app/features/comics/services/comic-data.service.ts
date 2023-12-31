import { Injectable } from '@angular/core';
import {
  FirebaseErrorHandlerService,
  HandleError,
} from '@shared/firebase/firebase-error-handler.service';
import {
  FirestoreResponse,
  FirestoreService,
} from '@shared/firebase/firestore.service';
import { Observable, catchError, from, map, take, tap } from 'rxjs';
import { Comic } from '../models';
import { AppStore } from '@core/app-store.service';
import { Logger } from '@core/logger.service';
import { ApiState } from '@core/app-store';

@Injectable({
  providedIn: 'root',
})
export class ComicDataService {
  private feature: string;
  private featurePlural: string;
  private handleError: HandleError;
  private path: string;
  private serviceName: string;

  constructor(
    private appStore: AppStore,
    private firestoreService: FirestoreService,
    private firebaseErrorHandlerService: FirebaseErrorHandlerService,
    private logger: Logger
  ) {
    const id = 'ynYZI4n3XarUz7tlW4zU68uHSm25';

    this.feature = 'comic';
    this.featurePlural = 'comics';
    this.path = `users/${id}/comics`;
    this.serviceName = 'ComicDataService';
    this.handleError = this.firebaseErrorHandlerService.createHandleError(
      this.serviceName
    );
  }

  getComics(): Observable<readonly Comic[]> {
    const operation = 'getComics';
    const message = (comicsLength: number) =>
      `${this.serviceName}: ${operation}: got ${comicsLength} ${this.featurePlural}`;

    return this.firestoreService.getCollectionStream(this.path).pipe(
      take(1),
      map((docData) => docData as readonly Comic[]),
      tap((comics) => {
        if (!comics) {
          this.setApiState(operation, 'failure');

          throw Error('empty comics');
        }

        this.setApiState(operation, 'success');

        this.logger.log(message(comics.length));
      }),
      catchError(this.handleError<readonly Comic[]>(operation))
    );
  }

  _getComics(): Observable<FirestoreResponse> {
    const operation = 'getComics';
    const message = (comicsLength: number) =>
      `${this.serviceName}: ${operation}: got ${comicsLength} ${this.featurePlural}`;

    return from(this.firestoreService.getDocuments(this.path)).pipe(
      tap((response) => {
        if (response.error) {
          this.setApiState(operation, 'failure');

          throw Error('no comics');
        }

        this.setApiState(operation, 'success');

        this.logger.log(message(response.document.length));
      }),
      catchError(this.handleError<FirestoreResponse>(operation))
    );
  }

  addComic(comic: Partial<Comic>): Observable<FirestoreResponse> {
    const newComic = this.getComicWithMetadataUrlSegment(comic);
    const operation = 'addComic';
    const message = `${this.serviceName}: ${operation}: added ${this.feature}`;

    return from(
      this.firestoreService.setDocumentNoId(this.path, newComic)
    ).pipe(
      tap((response) => {
        this.onResponseSetApiState(response, operation);

        this.logger.log(message);
      }),
      catchError(this.handleError<FirestoreResponse>(operation))
    );
  }

  updateComic(comic: Readonly<Comic>): Observable<FirestoreResponse> {
    const id = comic.metadata.id;
    const operation = 'updateComic';
    const message = `${this.serviceName}: ${operation}: updated ${this.feature}`;

    return from(
      this.firestoreService.updateDocument(this.path, id, comic)
    ).pipe(
      tap((response) => {
        this.onResponseSetApiState(response, operation);

        this.logger.log(message);
      }),
      catchError(this.handleError<FirestoreResponse>(operation))
    );
  }

  patchComic(
    comic: Readonly<Comic>,
    fields: Partial<Comic>
  ): Observable<FirestoreResponse> {
    const id = comic.metadata.id;
    const operation = 'patchComic';
    const message = `${this.serviceName}: ${operation}: patched ${this.feature}`;

    return from(
      this.firestoreService.patchDocument(this.path, id, comic, fields)
    ).pipe(
      tap((response) => {
        this.onResponseSetApiState(response, operation);

        this.logger.log(message);
      }),
      catchError(this.handleError<FirestoreResponse>(operation))
    );
  }

  deleteComic(id: string): Observable<FirestoreResponse> {
    const operation = 'deleteComic';
    const message = `${this.serviceName}: ${operation}: deleted ${this.feature}`;

    return from(this.firestoreService.deleteDocument(this.path, id)).pipe(
      tap((response) => {
        this.onResponseSetApiState(response, operation);

        this.logger.log(message);
      }),
      catchError(this.handleError<FirestoreResponse>(operation))
    );
  }

  private getComicWithMetadataUrlSegment(
    comic: Partial<Comic>
  ): Readonly<Comic> {
    let comicWithMetadataUrlSegment: Readonly<Comic>;
    let urlSegment: string;
    const metadata = {
      id: '',
      createdAt: null,
      updatedAt: null,
      urlSegment: '',
    };

    urlSegment = this.getComicUrlSegment(comic.title!);
    metadata.urlSegment = urlSegment;
    comicWithMetadataUrlSegment = { ...comic, metadata } as Readonly<Comic>;

    return comicWithMetadataUrlSegment;
  }

  private getComicUrlSegment(comicTitle: string): string {
    let comicUrlSegment: string;

    comicUrlSegment = comicTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .replace(/ /g, '-');

    return comicUrlSegment;
  }

  private onResponseSetApiState(
    response: FirestoreResponse,
    operation: string
  ): void {
    if (response.error) {
      this.setApiState(operation, 'failure');

      throw response.error;
    }

    this.setApiState(operation, 'success');
  }

  private setApiState(operation: string, status: ApiState['status']): void {
    this.appStore.setApiState({
      operation,
      status,
    });
  }
}
