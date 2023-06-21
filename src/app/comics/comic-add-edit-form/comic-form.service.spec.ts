import { TestBed } from '@angular/core/testing';

import { ComicFormService } from './comic-form.service';

describe('ComicFormService', () => {
  let service: ComicFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComicFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
