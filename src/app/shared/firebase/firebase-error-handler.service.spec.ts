import { TestBed } from '@angular/core/testing';

import { FirebaseErrorHandlerService } from './firebase-error-handler.service';

describe('FirebaseErrorHandlerService', () => {
  let service: FirebaseErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
