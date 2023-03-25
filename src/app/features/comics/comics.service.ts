import { Injectable } from '@angular/core';
import { arrayUnion } from '@angular/fire/firestore';
import { LoggerService } from '@core/logger/logger.service';
import {
  FirebaseErrorHandlerService,
  HandleError,
} from '@shared/firebase/firebase-error-handler.service';
import {
  FirestoreResponse,
  FirestoreService,
} from '@shared/firebase/firestore.service';
import { AutoId } from '@shared/utils/id-generator';
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
          `ComicsServiceService: getMangas: got ${comics.length} comics`
        );
      }),
      catchError(this.handleError<readonly Comic[]>('getComics', []))
    );
  }

  addComic(comic: Comic) {
    return from(this.firestoreService.addDocument(this.path, comic)).pipe(
      tap((res) => {
        if (res.error) {
          throw res.error;
        }

        this.loggerService.log(`ComicsServiceService: addComic: added comic`);
      }),
      catchError(this.handleError<FirestoreResponse>('addComic'))
    );
  }
}
