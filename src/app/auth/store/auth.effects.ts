import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AuthState } from "./auth.state";
import { catchError, from, map, mergeMap, of, withLatestFrom } from "rxjs";
import { AuthActions } from "./auth.actions";
import { authCurrentUserSelector, authUsersSelector } from "./auth.selectors";
import { UserService } from "../../services/user.service";

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private userService: UserService, private store: Store<AuthState>) {
  }

  getUsers$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.get_users),
    withLatestFrom(this.store.select(authUsersSelector)),
    mergeMap(([_, usersData]) => {
      if (!usersData.length) {
        return from(this.userService.GetAllUsers())
          .pipe(
            map(userData => AuthActions.get_users_success({ users: userData })),
            catchError((error) => of(AuthActions.get_users_failed({ error: error })))
          )
      } else {
        return of(AuthActions.get_users_success({ users: usersData }));
      }
    })
  ));

  getCurrentUser$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.get_current_user),
    withLatestFrom(this.store.select(authCurrentUserSelector)),
    mergeMap(([{ id }, user]) => {
      debugger;
      if (Object.keys(user).length === 0) {
        return from(this.userService.GetAUser(id))
          .pipe(
            map(userData => AuthActions.get_current_user_success(userData)),
            catchError((error) => of(AuthActions.get_current_user_failed({ error: error })))
          )
      } else {
        return of(AuthActions.get_current_user_success(user));
      }
    })
  ));
}
