import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, withLatestFrom } from "rxjs";
import { TagActions } from "./tags.actions";
import { Store } from "@ngrx/store";
import { TagsState } from "./tags.state";
import { tagsSelector } from "./tags.selectors";
import { TagService } from "../../services/tag.service";

@Injectable()
export class TagsEffects {

  constructor(private actions$: Actions, private tagService: TagService, private store: Store<TagsState>) {
  }

  getAllTags$ = createEffect(() => this.actions$.pipe(
    ofType(TagActions.get_all),
    withLatestFrom(this.store.select(tagsSelector)),
    mergeMap(([_, tagData]) => {
      if (tagData === undefined) {
        debugger;
        return this.tagService.getAllTags()
          .pipe(
            map(tagsData => TagActions.get_all_success({ tags: tagsData })),
            catchError((error) => of(TagActions.get_all_failed({ error: error })))
          );
      } else {
        return of(TagActions.get_all_success({ tags: tagData }));
      }
    })
  ));

}
