import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { FirestoreService } from '@shared/firebase/firestore.service';
import { comicsMock } from '@testing/comics.mock';
import { of } from 'rxjs';
import { Comic } from '../models/comic';
import { ComicDataService } from './comic-data.service';

describe('ComicDataService', () => {
  let comicDataService: ComicDataService;
  let firestoreService: jasmine.SpyObj<FirestoreService>;
  let expectedComics: readonly Comic[];
  let comicIdMock: string;

  beforeEach(() => {
    const firestoreServiceSpy = jasmine.createSpyObj('FirestoreService', [
      'getCollectionStream',
      'addDocument',
      'setDocument',
      'setDocumentNoId',
      'deleteDocument',
      'updateDocument',
    ]);

    expectedComics = [...comicsMock];
    comicIdMock = 'someId123';

    TestBed.configureTestingModule({
      providers: [
        ComicDataService,
        {
          provide: FirestoreService,
          useValue: firestoreServiceSpy,
        },
      ],
    });

    comicDataService = TestBed.inject(ComicDataService);
    firestoreService = TestBed.inject(
      FirestoreService
    ) as jasmine.SpyObj<FirestoreService>;
  });

  it('should be created', () => {
    expect(comicDataService).toBeTruthy();
  });

  describe('#getComics', () => {
    it('should return expected comics', fakeAsync(() => {
      firestoreService.getCollectionStream.and.returnValue(of(expectedComics));

      comicDataService.getComics().subscribe({
        next: (comics) =>
          expect(comics)
            .withContext('should return expected comics')
            .toEqual(expectedComics),
        error: () => fail,
      });

      flushMicrotasks();
    }));

    it('should not return comics on error', fakeAsync(() => {
      firestoreService.getCollectionStream.and.returnValue(of([]));

      comicDataService.getComics().subscribe({
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
