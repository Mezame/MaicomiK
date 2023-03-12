import { Injectable } from '@angular/core';
import { LoggerService } from '@core/logger/logger.service';
import {
  FirebaseErrorHandlerService,
  HandleError,
} from '@shared/firebase/firebase-error-handler.service';
import { FirestoreService } from '@shared/firebase/firestore.service';
import { catchError, from, map, tap } from 'rxjs';
import { Comic } from './comic';

@Injectable({
  providedIn: 'root',
})
export class ComicsService {
  private path: string;
  private handleError: HandleError;

  constructor(
    private firestoreService: FirestoreService,
    private firebaseErrorHandlerService: FirebaseErrorHandlerService,
    private loggerService: LoggerService
  ) {
    this.path = 'comics';
    this.handleError =
      this.firebaseErrorHandlerService.createHandleError('ComicsService');
  }

  getComics(id: string) {
    return from(this.firestoreService.getDocument(this.path, id)).pipe(
      map((res) => {
        let comics: readonly Comic[];

        if (res.error) {
          throw res.error;
        }

        comics = res.document!['payload'];

        this.loggerService.log(
          `ComicsService: getComics: got ${comics.length} comics`
        );

        return comics;
      }),
      catchError(this.handleError<readonly Comic[]>('getComics', []))
    );
  }
}
