import { Injectable } from "@angular/core";
import { NotificationService } from "../../services/notification.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { ReportsState } from "../../reports/store/reports.state";
import { catchError, from, map, mergeMap, of, withLatestFrom } from "rxjs";
import { NotificationActions } from "./notifications.actions";
import { notificationSelector } from "./notifications.selectors";

@Injectable()
export class NotificationEffects {

    constructor(
        private notificationService: NotificationService,
        private actions$: Actions,
        private store: Store<ReportsState>
    ) {
    }

    getNotifications$ = createEffect(() => this.actions$.pipe(

        ofType(NotificationActions.get_all),
        withLatestFrom(this.store.select(notificationSelector)),
        mergeMap(([_, notificationData]) => {
            if (!notificationData.length) {
                return from(this.notificationService.GetNotifications())
                    .pipe(
                        map(notifications => NotificationActions.get_all_success({ notifications: notifications })),
                        catchError((error) => of(NotificationActions.get_all_failed({ error: error })))
                    );
            } else {
                return of(NotificationActions.get_all_success({ notifications: notificationData }));
            }
        })
    ));

}
