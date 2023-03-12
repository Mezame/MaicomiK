import { TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FirestoreService } from './firestore.service';

describe('FirestoreService', () => {
  let firestoreService: jasmine.SpyObj<FirestoreService>;
  let collectionPathMock: string;
  let documentIdMock: string;
  let documentMock: {};

  beforeEach(() => {
    const firestoreServiceSpy = jasmine.createSpyObj('FirestoreService', [
      'getDocument',
      'addDocument',
      'setDocument',
      'setDocumentNoId',
      'deleteDocument',
      'updateDocument',
    ]);
    collectionPathMock = 'some-collection';
    documentIdMock = 'someId123';
    documentMock = { field: 'some data' };

    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
      ],
      providers: [
        {
          provide: FirestoreService,
          useValue: firestoreServiceSpy,
        },
      ],
    });

    firestoreService = TestBed.inject(
      FirestoreService
    ) as jasmine.SpyObj<FirestoreService>;
  });

  it('should be created', () => {
    expect(FirestoreService).toBeTruthy();
  });

  describe('#getDocument', () => {
    it('should get document and return a successful response', async () => {
      firestoreService.getDocument.and.returnValue(
        Promise.resolve({ success: true, document: documentMock })
      );

      const res = await firestoreService.getDocument(
        collectionPathMock,
        documentIdMock
      );

      expect(res.success).withContext('should return a true value').toBeTrue();
      expect(res.document)
        .withContext('should return a document')
        .toEqual(documentMock);
    });

    it('should not get document and return an error response', async () => {
      firestoreService.getDocument.and.returnValue(
        Promise.resolve({ error: new Error('some error') })
      );

      const res = await firestoreService.getDocument(
        collectionPathMock,
        documentIdMock
      );

      expect(res.error).withContext('should return error').toBeDefined();
    });
  });

  describe('#addDocument', () => {
    it('should add document and return a successful response', async () => {
      firestoreService.addDocument.and.returnValue(
        Promise.resolve({ success: true, id: documentIdMock })
      );

      const res = await firestoreService.addDocument(
        collectionPathMock,
        documentMock
      );

      expect(res.success).withContext('should return a true value').toBeTrue();
      expect(res.id).withContext('should return a string').toBeDefined();
    });

    it('should not add document and return an error response', async () => {
      firestoreService.addDocument.and.returnValue(
        Promise.resolve({ error: new Error('some error') })
      );

      const res = await firestoreService.addDocument(
        collectionPathMock,
        documentMock
      );

      expect(res.error).withContext('should return error').toBeDefined();
    });
  });

  describe('#setDocument', () => {
    it('should add document and return a successful response', async () => {
      firestoreService.setDocument.and.returnValue(
        Promise.resolve({ success: true })
      );

      const res = await firestoreService.setDocument(
        collectionPathMock,
        documentIdMock,
        documentMock
      );

      expect(res.success).withContext('should return a true value').toBeTrue();
    });

    it('should not add document and return an error response', async () => {
      firestoreService.setDocument.and.returnValue(
        Promise.resolve({ error: new Error('some error') })
      );

      const res = await firestoreService.setDocument(
        collectionPathMock,
        documentIdMock,
        documentMock
      );

      expect(res.error).withContext('should return error').toBeDefined();
    });
  });

  describe('#setDocumentNoId', () => {
    it('should add document and return a successful response', async () => {
      firestoreService.setDocumentNoId.and.returnValue(
        Promise.resolve({ success: true, id: documentIdMock })
      );

      const res = await firestoreService.setDocumentNoId(
        collectionPathMock,
        documentMock
      );

      expect(res.success).withContext('should return a true value').toBeTrue();
      expect(res.id).withContext('should return a string').toBeDefined();
    });

    it('should not add document and return an error response', async () => {
      firestoreService.setDocumentNoId.and.returnValue(
        Promise.resolve({ error: new Error('some error') })
      );

      const res = await firestoreService.setDocumentNoId(
        collectionPathMock,
        documentMock
      );

      expect(res.error).withContext('should return error').toBeDefined();
    });
  });

  describe('#deleteDocument', () => {
    it('should delete document and return a successful response', async () => {
      firestoreService.deleteDocument.and.returnValue(
        Promise.resolve({ success: true })
      );

      const res = await firestoreService.deleteDocument(
        collectionPathMock,
        documentIdMock
      );

      expect(res.success).withContext('should return a true value').toBeTrue();
    });

    it('should not delete document and return an error response', async () => {
      firestoreService.deleteDocument.and.returnValue(
        Promise.resolve({ error: new Error('some error') })
      );

      const res = await firestoreService.deleteDocument(
        collectionPathMock,
        documentIdMock
      );

      expect(res.error).withContext('should return error').toBeDefined();
    });
  });

  describe('#updateDocument', () => {
    it('should update document and return a successful response', async () => {
      firestoreService.updateDocument.and.returnValue(
        Promise.resolve({ success: true })
      );

      const res = await firestoreService.updateDocument(
        collectionPathMock,
        documentIdMock,
        documentMock
      );

      expect(res.success).withContext('should return a true value').toBeTrue();
    });

    it('should not update document and return an error response', async () => {
      firestoreService.updateDocument.and.returnValue(
        Promise.resolve({ error: new Error('some error') })
      );

      const res = await firestoreService.updateDocument(
        collectionPathMock,
        documentIdMock,
        documentMock
      );

      expect(res.error).withContext('should return error').toBeDefined();
    });
  });
});
