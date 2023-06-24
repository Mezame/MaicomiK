import { TestBed } from '@angular/core/testing';

import { AddComicFacadeService } from './add-comic-facade.service';

describe('AddComicFacadeService', () => {
  let service: AddComicFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddComicFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
