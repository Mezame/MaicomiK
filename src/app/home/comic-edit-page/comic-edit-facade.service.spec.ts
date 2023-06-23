import { TestBed } from '@angular/core/testing';

import { ComicEditFacadeService } from './comic-edit-facade.service';

describe('ComicEditFacadeService', () => {
  let service: ComicEditFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComicEditFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
