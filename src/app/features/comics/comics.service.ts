import { Injectable } from '@angular/core';
import { Logger } from '@core/logger/logger.service';
import {
  FirebaseErrorHandlerService,
  HandleError,
} from '@shared/firebase/firebase-error-handler.service';
import {
  FirestoreResponse,
  FirestoreService,
} from '@shared/firebase/firestore.service';
import { Observable, catchError, from, map, tap } from 'rxjs';
import { Comic } from './comic';
import { ApiState, ComicsStoreService } from './comics-store.service';

@Injectable({
  providedIn: 'root',
})
export class ComicsService {
  private feature: string;
  private featurePlural: string;
  private handleError: HandleError;
  private path: string;
  private serviceName: string;

  constructor(
    private comicsStoreService: ComicsStoreService,
    private firestoreService: FirestoreService,
    private firebaseErrorHandlerService: FirebaseErrorHandlerService,
    private logger: Logger
  ) {
    const id = 'ynYZI4n3XarUz7tlW4zU68uHSm25';

    this.feature = 'comic';
    this.featurePlural = 'comics';
    this.path = `users/${id}/comics`;
    this.serviceName = 'ComicsService';
    this.handleError = this.firebaseErrorHandlerService.createHandleError(
      this.serviceName
    );
  }

  getComics(): Observable<readonly Comic[]> {
    const operation = 'getComics';
    const message = (comicsLength: number) =>
      `${this.serviceName}: ${operation}: got ${comicsLength} ${this.featurePlural}`;

    return this.firestoreService.getCollection(this.path).pipe(
      map((docData) => docData as readonly Comic[]),
      tap((comics) => {
        this.setApiState(operation, 'success');

        this.logger.log(message(comics.length));
      }),
      catchError(this.handleError<readonly Comic[]>(operation, []))
    );
  }

  addComic(comic: Partial<Comic>): Observable<FirestoreResponse> {
    const newComic = this.addMetadataUrlSegment(comic);
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

  private addMetadataUrlSegment(comic: Partial<Comic>): Readonly<Comic> {
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
    this.comicsStoreService.setApiState({
      operation,
      status,
    });
  }
}
