import { createReducer, on } from "@ngrx/store";
import { initialState, NotificationsState } from "./notifications.state";
import { NotificationActions } from "./notifications.actions";

export const notificationReducer = createReducer(
    initialState,
    on(NotificationActions.get_all_success, (state: NotificationsState, data) => {
        return {
            ...state,
            notifications: data.notifications
        }
    })
);
