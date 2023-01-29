import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../../types";

const COMPONENT = "AUTH";

export const AuthActions = createActionGroup({
  source: COMPONENT,
  events: {
    GET_USERS: emptyProps(),
    GET_USERS_SUCCESS: props<{ users: User[] }>(),
    GET_USERS_FAILED: props<{ error: string }>(),
    GET_CURRENT_USER: props<{ id: string }>(),
    GET_CURRENT_USER_SUCCESS: props<User>(),
    GET_CURRENT_USER_FAILED: props<{ error: string }>()
  }
});
