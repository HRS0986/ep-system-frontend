import { createAction, props } from "@ngrx/store";
import { LOGIN, LOGOUT, SIGNUP, SUCCESS, FAILED } from "../../app.actions";

const COMPONENT = "[AUTH]";

export const login = createAction(`${COMPONENT} ${LOGIN}`, props<{username: string, password: string}>());
export const logout = createAction(`${COMPONENT} ${LOGOUT}`);
export const signup = createAction(`${COMPONENT} ${SIGNUP}`);

export const loginSuccess = createAction(`${COMPONENT} ${LOGIN} ${SUCCESS}`);
export const logoutSuccess = createAction(`${COMPONENT} ${LOGOUT} ${SUCCESS}`);
export const signupSuccess = createAction(`${COMPONENT} ${SIGNUP} ${SUCCESS}`);

export const loginFailed = createAction(`${COMPONENT} ${LOGIN} ${FAILED}`);
export const logoutFailed = createAction(`${COMPONENT} ${LOGOUT} ${FAILED}`);
export const signupFailed = createAction(`${COMPONENT} ${SIGNUP} ${FAILED}`);
