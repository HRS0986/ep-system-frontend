import { createReducer, on } from "@ngrx/store";
import { AuthState, initialState } from "./auth.state";
import { AuthActions } from "./auth.actions";

export const authReducer = createReducer(
  initialState,
  on(AuthActions.get_users_success, (state: AuthState, data) => {
    return {
      ...state,
      users: data.users
    };
  }),
  on(AuthActions.get_current_user_success, (state: AuthState, data) => {
    return {
      ...state,
      currentUser: data
    }
  })
);
