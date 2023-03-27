import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

interface ApiState {
  operation: string;
  status: 'loading' | 'success' | 'failure';
}

@Injectable({
  providedIn: 'root',
})
export class ComicsStoreService {
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
