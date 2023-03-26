import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from '@angular/fire/firestore';
import { LoggerService } from '@core/logger/logger.service';
import { Observable } from 'rxjs';

export interface FirestoreResponse {
  success?: true;
  document?: any;
  id?: string;
  error?: any;
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(
    private firestore: Firestore,
    private loggerService: LoggerService
  ) {}

  /**
   * Get a stream of documents from Firestore.
  @param path A slash-separated path to a Firestore collection.
  @returns Returns a stream of documents.
  **/
  getCollection(path: string) {
    let collRef: CollectionReference<DocumentData>;
    let documents$: Observable<readonly DocumentData[]>;

    collRef = collection(this.firestore, path);
    documents$ = collectionData(collRef);

    return documents$;
  }

  /**
   * Add a new document to Firestore.
  @param path A slash-separated path to a Firestore collection.
  @param document An Object containing the data for the new document.
  @returns A promise with a Firestore custom response.
  **/
  async addDocument(path: string, document: any) {
    let collRef: CollectionReference<DocumentData>;
    let docRef: DocumentReference<DocumentData>;
    let docRefId: string;

    try {
      collRef = collection(this.firestore, path);
      docRef = await addDoc(collRef, document);

      if (!docRef.id) {
        throw new Error('could not add document');
      }

      docRefId = docRef.id;

      this.loggerService.log(
        `FirestoreGlobalService: addDocument: added document w/ id=${docRefId}`
      );

      return { success: true, id: docRefId } as FirestoreResponse;
    } catch (error) {
      return { error } as FirestoreResponse;
    }
  }

  /**
   * Add a new document to Firestore with a custom id.
  @param path A slash-separated path to a Firestore collection.
  @param id A custom id for the Firestore document.
  @param document An Object containing the data for the new document.
  @returns A promise with a Firestore custom response.
  **/
  async setDocument(path: string, id: string, document: any) {
    let docRef: DocumentReference<DocumentData>;
    let res: any;

    try {
      docRef = doc(this.firestore, path, id);
      document.metadata.id = id;

      res = await setDoc(docRef, document);

      if (res !== undefined) {
        throw new Error('could not add document');
      }

      this.loggerService.log(
        `FirestoreGlobalService: setDocument: added document w/ id=${id}`
      );

      return { success: true } as FirestoreResponse;
    } catch (error) {
      return { error } as FirestoreResponse;
    }
  }

  /**
   * Add a new document to Firestore and save the auto-generated id in the metadata field.
  @param path A slash-separated path to a Firestore collection.
  @param document An Object containing the data for the new document.
  @returns A promise with a Firestore custom response.
  **/
  async setDocumentNoId(path: string, document: Readonly<any>) {
    let collRef: CollectionReference<DocumentData>;
    let docRef: DocumentReference<DocumentData>;
    let docRefId: string;
    let currentTimestamp: Timestamp;
    let newDocument: any;
    let res: any;

    try {
      collRef = collection(this.firestore, path);
      docRef = doc(collRef);
      docRefId = docRef?.id;
      currentTimestamp = Timestamp.fromDate(new Date());
      newDocument = {
        ...document,
        metadata: {
          ...document['metadata'],
          id: docRefId,
          createdAt: currentTimestamp,
          updatedAt: currentTimestamp,
        },
      };

      res = await setDoc(docRef, newDocument);

      if (res !== undefined) {
        throw new Error('could not add document');
      }

      this.loggerService.log(
        `FirestoreGlobalService: setDocumentNoId: added document w/ id=${docRefId}`
      );

      return {
        success: true,
        document: newDocument,
        id: docRefId,
      } as FirestoreResponse;
    } catch (error) {
      return { error } as FirestoreResponse;
    }
  }

  /**
   * Add a new document to Firestore with a custom id.
  @param path A slash-separated path to a Firestore collection.
  @param id The id for the document to be deleted.
  @returns A promise with a Firestore custom response.
  **/
  async deleteDocument(path: string, id: string) {
    let docRef: DocumentReference<DocumentData>;
    let res: any;

    try {
      docRef = doc(this.firestore, `${path}/${id}`);
      res = await deleteDoc(docRef);

      if (res !== undefined) {
        throw new Error('could not delete document');
      }

      this.loggerService.log(
        `FirestoreGlobalService: deleteDocument: deleted document w/ id=${id}`
      );

      return { success: true } as FirestoreResponse;
    } catch (error) {
      return { error } as FirestoreResponse;
    }
  }

  /**
   * Add a new document to Firestore with a custom id.
  @param path A slash-separated path to a Firestore collection.
  @param id The id for the document to be updated.
  @param document An Object containing the data for the document to be updated.
  @returns A promise with a Firestore custom response.
  **/
  async updateDocument(path: string, id: string, document: any) {
    let docRef: DocumentReference<DocumentData>;
    let res: any;

    try {
      docRef = doc(this.firestore, `${path}/${id}`);
      res = await updateDoc(docRef, { ...document });

      if (res !== undefined) {
        throw new Error('could not update document');
      }

      this.loggerService.log(
        `FirestoreGlobalService: updateDocument: updated document w/ id=${id}`
      );

      return { success: true } as FirestoreResponse;
    } catch (error) {
      return { error } as FirestoreResponse;
    }
  }
}
