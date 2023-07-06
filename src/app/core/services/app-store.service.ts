import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiState, ApiStateServices } from './app-store';
import { Logger } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class AppStore implements ApiStateServices {
  initialState: {};
  private apiState$: BehaviorSubject<ApiState>;

  constructor(private logger: Logger) {
    this.initialState = {};
    this.apiState$ = new BehaviorSubject(this.initialState as ApiState);
  }

  clearApiState(): void {
    this.apiState$.next(this.initialState as ApiState);
  }

  getApiState(): Observable<ApiState> {
    const apiState$ = this.apiState$.asObservable();

    return apiState$;
  }

  setApiState(apiState: ApiState): void {
    this.apiState$.next(apiState);

    this.setApiStateLogger(apiState);
  }

  private setApiStateLogger(apiState: ApiState): void {
    const message = (
      operation: ApiState['operation'],
      status: ApiState['status']
    ) => `${operation} api state = ${status}`;

    if (apiState) {
      this.logger.log(message(apiState.operation, apiState.status));
    }
  }
}
