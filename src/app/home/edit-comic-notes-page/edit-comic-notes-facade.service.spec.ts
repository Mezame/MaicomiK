import { TestBed } from '@angular/core/testing';

import { EditComicNotesFacadeService } from './edit-comic-notes-facade.service';

describe('EditComicNotesFacadeService', () => {
  let service: EditComicNotesFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditComicNotesFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
