import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { Logger } from './logger.service';

export interface ApiState {
  operation: string;
  status: 'failure' | 'loading' | 'success';
}

@Injectable({
  providedIn: 'root',
})
export class AppStoreService {
  private apiState$: ReplaySubject<ApiState | null>;

  constructor(private logger: Logger) {
    this.apiState$ = new ReplaySubject(1);
  }

  clearApiState(): void {
    this.apiState$.next(null);
  }

  getApiState(): Observable<ApiState | null> {
    const apiState$ = this.apiState$.asObservable();

    this.setApiStateLogger(apiState$);

    return apiState$;
  }

  setApiState(apiState: ApiState): void {
    this.apiState$.next(apiState);

    this.setApiStateLogger(this.apiState$);
  }

  private setApiStateLogger(
    apiState$: Observable<ApiState | null>
  ): Observable<ApiState | null> {
    const message = (
      operation: ApiState['operation'],
      status: ApiState['status']
    ) => `${operation} status: ${status}`;

    apiState$.pipe(
      tap((apiState) => {
        if (apiState) {
          this.logger.log(message(apiState.operation, apiState.status));
        }
      })
    );

    return apiState$;
  }
}
