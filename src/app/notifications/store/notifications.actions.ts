import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Notification } from "../../types";


const COMPONENT = "NOTIFICATION";

export const NotificationActions = createActionGroup({
    source: COMPONENT,
    events: {
        GET_ALL: emptyProps(),
        GET_ALL_SUCCESS: props<{ notifications: Notification[] }>(),
        GET_ALL_FAILED: props<{ error: string }>()
    }
});
