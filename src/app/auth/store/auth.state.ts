import { User } from "../../types";

export interface AuthState {
    currentUser: User;
    users: User[]
}

export const initialState: AuthState = {
  users: [],
  currentUser: {}
};
