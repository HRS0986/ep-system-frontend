import { User } from "../../types";

export interface AuthState {
    isLoggedIn: boolean;
    currentUser: User
}
