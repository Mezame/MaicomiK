import { TestBed } from '@angular/core/testing';

import { ComicDetailFacadeService } from './comic-detail-facade.service';

describe('ComicDetailFacadeService', () => {
  let service: ComicDetailFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComicDetailFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
