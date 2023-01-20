import { Injectable } from '@angular/core';
import { FnResponse, User } from "../types";
import {
  deleteDoc,
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc,
} from "@angular/fire/firestore";
import firebase from "firebase/compat";
import { DocumentReference } from "@firebase/firestore";
import { Observable } from "rxjs";
import { Functions, httpsCallable } from "@angular/fire/functions";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
      private firestore: Firestore,
      private functions: Functions,
  ) { }

  public async GetAllUsers(): Promise<User[]> {
    const getAllUsers = httpsCallable<null, FnResponse<User[] | Error>>(this.functions, "getAllUsers");
    const res = await getAllUsers();
    if (!res.data.status) {
      throw res.data.data as Error;
    }
    return res.data.data as User[];
  }

  public GetAUser(uid: string): Observable<User> {
    const userRef = doc(this.firestore, `Users/${uid}`);
    return docData<User>(userRef);
  }

  public CreateUser(user: User): Promise<FnResponse> {
    const userRef = doc(this.firestore, `Users/${user.UID}`);
    return setDoc<User>(userRef, user).then(() => {
      console.log('Client updated successfully.');
      return {
        status: true,
        message: 'Client updated successfully.',
        data: null,
      };
    }).catch((error: any) => {
      console.log('Error updating client: ', error);
      return {
        status: false,
        message: error.message,
        data: error,
      };
    });
  }

  public UpdateUserData(user: User): Promise<FnResponse> {
    const userId = user.UID;
    delete user.UID;
    const userRef = doc(this.firestore, `Users/${userId}`) as DocumentReference<User>;
    return updateDoc<User>(userRef, user).then(() => {
      console.log('User updated successfully.');
      return {
        status: true,
        message: 'User updated successfully.',
        data: null,
      };
    }).catch((error: any) => {
      console.log('Error updating user: ', error);
      return {
        status: false,
        message: error.message,
        data: error,
      };
    });
  }

  public SetFirebaseUserData(user: firebase.User): Promise<FnResponse> {
    const _user: User = {
      LastSignInAt: user.metadata.lastSignInTime,
    }
    const userRef = doc(this.firestore, `Users/${user.uid}`) as DocumentReference<User>;
    return updateDoc<User>(userRef, _user).then(() => {
      console.log('User updated successfully.');
      return {
        status: true,
        message: 'User updated successfully.',
        data: null,
      };
    }).catch((error: any) => {
      console.log('Error updating user: ', error);
      return {
        status: false,
        message: error.message,
        data: error,
      };
    });
  }

  public DeleteUser(uid: string): Promise<FnResponse> {
    const userRef = doc(this.firestore, `Users/${uid}`);
    return deleteDoc(userRef).then(() => {
      console.log('User deleted successfully.');
      return {
        status: true,
        message: 'User deleted successfully.',
        data: null,
      };
    }).catch((error: any) => {
      console.log('Error deleting user: ', error);
      return {
        status: false,
        message: error.message,
        data: error,
      };
    });
  }

  public async UpdateUserStatus(uid: string, disabled: boolean): Promise<FnResponse> {
    const changeUserStatus = httpsCallable<{uid: string, disabled: boolean}, FnResponse>(this.functions, "changeUserStatus");
    const res = await changeUserStatus({uid, disabled});
    return res.data;
  }
}
