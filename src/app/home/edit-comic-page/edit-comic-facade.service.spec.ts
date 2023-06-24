import { TestBed } from '@angular/core/testing';

import { EditComicFacadeService } from './edit-comic-facade.service';

describe('EditComicFacadeService', () => {
  let service: EditComicFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditComicFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
