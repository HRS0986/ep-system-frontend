import { Injectable } from '@angular/core';
import { Tag } from "../types";
import { Observable } from "rxjs";
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  query,
  setDoc,
  where
} from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(
    private firestore: Firestore
  ) {
  }

  getTag(tagID: string): Observable<Tag> {
    const tagRef = doc(this.firestore, `Tags/${tagID}`);
    return docData(tagRef, { idField: 'ID' }) as Observable<Tag>;
  }

  getAllTags(): Observable<Tag[]> {
    const tagRef = collection(this.firestore, 'Tags');
    const q1 = query(tagRef, where('IsActive', '==', true));
    return collectionData(q1, { idField: 'ID' }) as Observable<Tag[]>;
  }

  createNewTag(tag: Tag) {
    const allTagRef = collection(this.firestore, 'Tags');
    return addDoc(allTagRef, tag).then((doc) => {
      console.log(doc);
      return {
        status: true,
        message: 'Tag created successfully.',
        data: null,
      };
    }).catch((err) => {
      console.error(err);
      return {
        status: false,
        message: err.message,
        data: err,
      };
    });
  }

  updateTag(tag: Tag) {
    const tagId = tag.Id;
    const _data: any = tag;
    delete _data.ID;

    const tagRef = doc(this.firestore, `Tags/${tagId}`);
    return setDoc(tagRef, _data).then((doc) => {
      console.log(doc);
      return {
        status: true,
        message: 'Tag updated successfully.',
        data: null,
      };
    }).catch((err) => {
      console.error(err);
      return {
        status: false,
        message: err.message,
        data: err,
      };
    });
  }

  deleteTag(tagId: string) {
    const tagRef = doc(this.firestore, `Tags/${tagId}`);
    return deleteDoc(tagRef).then(() => {
      console.log('Tag deleted successfully.');
      return {
        status: true,
        message: 'Tag deleted successfully.',
        data: null,
      };
    }).catch(err => {
      console.log('Error deleting tag: ', err);
      return {
        status: false,
        message: err.message,
        data: err,
      };
    });
  }

}
