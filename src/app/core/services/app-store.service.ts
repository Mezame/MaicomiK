import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

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

  getApiState() {
    return this.apiState$.asObservable();
  }

  setApiState(apiState: ApiState) {
    this.apiState$.next(apiState);
  }

  clearApiState() {
    this.apiState$.next(null);
  }
}
