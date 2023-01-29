import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { AllNotificationsComponent } from './components/all-notifications/all-notifications.component';
import { LetterComponent } from './components/popups/letter/letter.component';
import { MaterialModule } from "../app.material.module";
import { StoreModule } from "@ngrx/store";
import { NOTIFICATION_FEATURE_NAME } from "./store/notifications.selectors";
import { notificationReducer } from "./store/notifications.reducer";
import { EffectsModule } from "@ngrx/effects";
import { NotificationEffects } from "./store/notifications.effects";


@NgModule({
    declarations: [
        AllNotificationsComponent,
        LetterComponent
    ],
    imports: [
        CommonModule,
        NotificationsRoutingModule,
        MaterialModule,
        StoreModule.forFeature(NOTIFICATION_FEATURE_NAME, notificationReducer),
        EffectsModule.forFeature([NotificationEffects])
    ]
})
export class NotificationsModule {
}
