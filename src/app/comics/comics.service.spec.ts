import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { FirestoreService } from '@shared/firebase/firestore.service';
import { comicsMock } from '@testing/comics.mock';
import { Comic } from './comic';

import { ComicsService } from './comics.service';

describe('ComicsService', () => {
  let comicsService: ComicsService;
  let firestoreService: jasmine.SpyObj<FirestoreService>;
  let expectedComics: Comic[];
  let comicIdMock: string;

  beforeEach(() => {
    const firestoreServiceSpy = jasmine.createSpyObj('FirestoreService', [
      'getDocument',
      'addDocument',
      'setDocument',
      'setDocumentNoId',
      'deleteDocument',
      'updateDocument',
    ]);

    expectedComics = comicsMock;
    comicIdMock = 'someId123';

    TestBed.configureTestingModule({
      providers: [
        ComicsService,
        {
          provide: FirestoreService,
          useValue: firestoreServiceSpy,
        },
      ],
    });

    comicsService = TestBed.inject(ComicsService);
    firestoreService = TestBed.inject(
      FirestoreService
    ) as jasmine.SpyObj<FirestoreService>;
  });

  it('should be created', () => {
    expect(comicsService).toBeTruthy();
  });

  describe('#getComics', () => {
    it('should return expected comics', fakeAsync(() => {
      firestoreService.getDocument.and.returnValue(
        Promise.resolve({
          success: true,
          document: { payload: expectedComics },
        })
      );

      comicsService.getComics().subscribe({
        next: (comics) =>
          expect(comics)
            .withContext('should return expected comics')
            .toEqual(expectedComics),
        error: () => fail,
      });

      flushMicrotasks();
    }));

    it('should not return comics on error', fakeAsync(() => {
      firestoreService.getDocument.and.returnValue(
        Promise.resolve({ error: new Error('some error') })
      );

      comicsService.getComics().subscribe({
        next: (comics) =>
          expect(comics.length)
            .withContext('should have empty array')
            .toEqual(0),
        error: () => fail,
      });

      flushMicrotasks();
    }));
  });
});
