import { TestBed } from '@angular/core/testing';

import { AddComicReadersFacadeService } from './add-comic-readers-facade.service';

describe('AddComicReadersFacadeService', () => {
  let service: AddComicReadersFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddComicReadersFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
