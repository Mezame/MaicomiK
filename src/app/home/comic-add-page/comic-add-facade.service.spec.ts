import { TestBed } from '@angular/core/testing';

import { ComicAddFacadeService } from './comic-add-facade.service';

describe('ComicAddFacadeService', () => {
  let service: ComicAddFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComicAddFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
