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

  createNewTag(tag: Tag) {
    let tags = new Array<Tag>();
    return of(tags);
  }

  updateTag(tag: Tag) {
    let tags = new Array<Tag>();
    return of(tags);
  }

  deleteTag(tagId: string) {
    let tags = new Array<Tag>();
    return of(tags);
  }

}
