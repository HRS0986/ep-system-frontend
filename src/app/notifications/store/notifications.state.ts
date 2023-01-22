import { Notification } from "../../types";

export interface NotificationsState {
    notifications: Notification[];
}

export const initialState: NotificationsState = {
    notifications: new Array<Notification>()
}
