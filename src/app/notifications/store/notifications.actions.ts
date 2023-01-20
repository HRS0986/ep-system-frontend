import { createAction, props } from "@ngrx/store";
import { GET_ALL, DELETE, SUCCESS, FAILED, MARK_AS_READ, MARK_AS_UNREAD } from "../../app.actions";


const COMPONENT = "[NOTIFICATION]";

export const getAllNotifications = createAction(`${COMPONENT} ${GET_ALL}`);
export const removeNotification = createAction(`${COMPONENT} ${DELETE}`, props<{id: string}>());
export const markAsRead = createAction(`${COMPONENT} ${MARK_AS_READ}`, props<{id: string}>());
export const markAsUnread = createAction(`${COMPONENT} ${MARK_AS_UNREAD}`, props<{id: string}>());

export const getAllNotificationsSuccess = createAction(`${COMPONENT} ${GET_ALL} ${SUCCESS}`);
export const removeNotificationSuccess = createAction(`${COMPONENT} ${DELETE} ${SUCCESS}`);
export const markAsReadSuccess = createAction(`${COMPONENT} ${MARK_AS_READ} ${SUCCESS}`, props<{id: string}>());
export const markAsUnreadSuccess = createAction(`${COMPONENT} ${MARK_AS_UNREAD} ${SUCCESS}`, props<{id: string}>());

export const getAllNotificationsFailed = createAction(`${COMPONENT} ${GET_ALL} ${FAILED}`);
export const removeNotificationFailed = createAction(`${COMPONENT} ${DELETE} ${FAILED}`);
export const markAsReadFailed = createAction(`${COMPONENT} ${MARK_AS_READ} ${FAILED}`, props<{id: string}>());
export const markAsUnreadFailed = createAction(`${COMPONENT} ${MARK_AS_UNREAD} ${FAILED}`, props<{id: string}>());
