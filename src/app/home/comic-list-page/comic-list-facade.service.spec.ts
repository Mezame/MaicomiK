import { TestBed } from '@angular/core/testing';

import { ComicListFacadeService } from './comic-list-facade.service';

describe('ComicListFacadeService', () => {
  let service: ComicListFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComicListFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
