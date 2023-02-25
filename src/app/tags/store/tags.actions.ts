import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Tag } from "../../types";

const COMPONENT = "TAG";

export const TagActions = createActionGroup({
  source: COMPONENT,
  events: {
    GET_ALL: emptyProps(),
    GET_ALL_SUCCESS: props<{ tags?: Tag[] }>(),
    GET_ALL_FAILED: props<{ error: string }>(),
  }
});


