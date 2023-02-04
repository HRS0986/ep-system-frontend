import { Injectable } from '@angular/core';
import { collection, collectionData, doc, docData, Firestore, query, setDoc, where } from "@angular/fire/firestore";
import { firstValueFrom, Observable } from "rxjs";
import { FnResponse, Project } from "../types";
import { Functions, httpsCallable } from "@angular/fire/functions";

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(
        private firestore: Firestore,
        private functions: Functions
    ) {
    }

    public GetProject(projectID: string): Observable<Project> {
        const projectRef = doc(this.firestore, `Projects/${projectID}`);
        return docData(projectRef, { idField: 'ID' }) as Observable<Project>;
    }

    public GetAllProjects(): Observable<Project[]> {
        const projectRef = collection(this.firestore, 'Projects');
        const q1 = query(projectRef, where('IsActive', '==', true));
        return collectionData(q1, { idField: 'ID' }) as Observable<Project[]>;
    }

    public async CreateProject(data: Project) {
        // Check duplicate project ID
        const allProjectRef = collection(this.firestore, 'Projects');
        const q1 = query(allProjectRef, where('IsActive', '==', true), where('ID', '==', data.ID));
        const allProjects = await firstValueFrom(collectionData(q1, { idField: 'ID' }) as Observable<Project[]>);
        if (allProjects.length != 0) {
            console.log(allProjects);
            const err = Error("Duplicate Project ID");
            console.error(err);
            return {
                status: false,
                message: err.message,
                data: err,
            }
        }

        const projectRef = doc(this.firestore, `Projects/${data.ID}`);
        return setDoc(projectRef, data).then((doc) => {
            console.log(doc);
            return {
                status: true,
                message: 'Project created successfully.',
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

    public UpdateProject(data: Project) {
        const projectId = data.ID;
        const _data: any = data;
        delete _data.ID;

        const projectRef = doc(this.firestore, `Projects/${projectId}`);
        return setDoc(projectRef, _data).then((doc) => {
            console.log(doc);
            return {
                status: true,
                message: 'Project updated successfully.',
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

    public async DeleteProject(projectID: string): Promise<FnResponse> {
        const deleteProject = httpsCallable<{ projectID: string }, FnResponse>(this.functions, 'deleteProject');
        const res = await deleteProject({ projectID });
        return res.data;
    }
}
