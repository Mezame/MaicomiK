import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Observable, of } from 'rxjs';

export type HandleError = <T>(
  operation?: string,
  result?: T
) => (error: Error) => Observable<T>;

@Injectable({
  providedIn: 'root',
})
export class FirebaseErrorHandlerService {
  constructor() {}

  createHandleError =
    (serviceName = '') =>
    <T>(operation = 'operation', result = {} as T) =>
      this.handleError(serviceName, operation, result);

  private handleError<T>(
    serviceName = '',
    operation = 'operation',
    result = {} as T
  ) {
    return (error: Error): Observable<T> => {
      console.error(error as any);

      const message = !(error instanceof FirebaseError)
        ? error.message
        : `Firebase returned code '${error.code}' with error '${error.message}'`;

      console.log(`${serviceName}: ${operation} failed: ${message}`);

      return of(result);
    };
  }
}
