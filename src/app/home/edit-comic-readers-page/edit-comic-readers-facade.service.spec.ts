import { TestBed } from '@angular/core/testing';

import { EditComicReadersFacadeService } from './edit-comic-readers-facade.service';

describe('EditComicReadersFacadeService', () => {
  let service: EditComicReadersFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditComicReadersFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
