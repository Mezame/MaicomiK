import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { FirestoreService } from '@shared/firebase/firestore.service';
import { comicsMock } from '@testing/comics.mock';
import { ComicsDataService } from './comics-data.service';
import { Comic } from '../models/comic';

describe('ComicsDataService', () => {
  let comicsDataService: ComicsDataService;
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
        ComicsDataService,
        {
          provide: FirestoreService,
          useValue: firestoreServiceSpy,
        },
      ],
    });

    comicsDataService = TestBed.inject(ComicsDataService);
    firestoreService = TestBed.inject(
      FirestoreService
    ) as jasmine.SpyObj<FirestoreService>;
  });

  it('should be created', () => {
    expect(comicsDataService).toBeTruthy();
  });

  describe('#getComics', () => {
    it('should return expected comics', fakeAsync(() => {
      firestoreService.getDocument.and.returnValue(
        Promise.resolve({
          success: true,
          document: { payload: expectedComics },
        })
      );

      comicsDataService.getComics().subscribe({
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

      comicsDataService.getComics().subscribe({
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
