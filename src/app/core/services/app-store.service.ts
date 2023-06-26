import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

export interface ApiState {
  operation: string;
  status: 'failure' | 'loading' | 'success';
}

@Injectable({
  providedIn: 'root',
})
export class AppStoreService {
  private apiState$: ReplaySubject<ApiState | null>;

  constructor() {
    this.apiState$ = new ReplaySubject(1);
  }

  clearApiState(): void {
    this.apiState$.next(null);
  }

  getApiState(): Observable<ApiState | null> {
    const apiState$ = this.apiState$.asObservable();

    return apiState$;
  }

  setApiState(apiState: ApiState): void {
    this.apiState$.next(apiState);
  }
}
