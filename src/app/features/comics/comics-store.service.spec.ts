import { TestBed } from '@angular/core/testing';

import { ComicsStoreService } from './comics-store.service';

describe('ComicsStoreService', () => {
  let service: ComicsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComicsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
