import { Injectable } from '@angular/core';
import { Tag } from "../types";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor() {
  }

  getAllTags(): Observable<Tag[]> {
    let tags = new Array<Tag>();
    return of(tags);
  }

  createNewTag(tag: Tag): Promise<any> {
    let tags = new Array<Tag>();
    let p = Promise.resolve(tags);
    return p;
  }

  updateTag(tag: Tag): Promise<any> {
    let tags = new Array<Tag>();
    let p = Promise.resolve(tags);
    return p;
  }

  deleteTag(tagId: string): Promise<any> {
    let tags = new Array<Tag>();
    let p = Promise.resolve(tags);
    return p;
  }

}
