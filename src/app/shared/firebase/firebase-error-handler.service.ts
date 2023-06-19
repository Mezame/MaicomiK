import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Logger } from '@core/logger/logger.service';
import { Observable, of } from 'rxjs';

export type HandleError = <T>(
  operation?: string,
  result?: T
) => (error: Error) => Observable<T>;

@Injectable({
  providedIn: 'root',
})
export class FirebaseErrorHandlerService {
  constructor(private logger: Logger) {}

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
      this.logger.error(error as any);

      const message = !(error instanceof FirebaseError)
        ? error.message
        : `Firebase returned code '${error.code}' with error '${error.message}'`;

      this.logger.log(`${serviceName}: ${operation} failed: ${message}`);

      return of(result);
    };
  }
}
