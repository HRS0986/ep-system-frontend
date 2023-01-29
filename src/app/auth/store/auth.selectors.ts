import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

export const AUTH_FEATURE_NAME = 'auth';

const getAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_NAME);

export const authUsersSelector = createSelector(getAuthState, state => state.users);
