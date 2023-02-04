import { createFeatureSelector, createSelector } from "@ngrx/store";
import { NotificationsState } from "./notifications.state";

export const NOTIFICATION_FEATURE_NAME = 'reports';

const getNotificationState = createFeatureSelector<NotificationsState>(NOTIFICATION_FEATURE_NAME);

export const notificationSelector = createSelector(getNotificationState, state => state.notifications);
