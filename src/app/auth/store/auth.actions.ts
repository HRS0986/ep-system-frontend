import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { FAILED, LOGIN, LOGOUT, SIGNUP, SUCCESS } from "../../app.actions";
import { User } from "../../types";

const COMPONENT = "AUTH";

export const AuthActions = createActionGroup({
  source: COMPONENT,
  events: {
    GET_USERS: emptyProps(),
    GET_USERS_SUCCESS: props<{ users: User[] }>(),
    GET_USERS_FAILED: props<{ error: string }>()
  }
});
