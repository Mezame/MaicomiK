import { TestBed } from '@angular/core/testing';

import { AddComicNotesFacadeService } from './add-comic-notes-facade.service';

describe('AddComicNotesFacadeService', () => {
  let service: AddComicNotesFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddComicNotesFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
