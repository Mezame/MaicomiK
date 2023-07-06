
import { Observable } from 'rxjs';

export interface ApiState {
    operation: string;
    status: 'failure' | 'loading' | 'success';
  }

export interface ApiStateServices {
  clearApiState(): void;
  getApiState(): Observable<ApiState>;
  setApiState(apiState: ApiState): void
}