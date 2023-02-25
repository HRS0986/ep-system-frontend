import { createReducer, on } from "@ngrx/store";
import { initialState, TagsState } from "./tags.state";
import { TagActions } from "./tags.actions";


export const tagsReducer = createReducer(
  initialState,
  on(TagActions.get_all_success, (state: TagsState, data) => {
    return {
      ...state,
      tags: data.tags
    };
  }),
);
