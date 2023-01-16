import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { AllNotificationsComponent } from './components/all-notifications/all-notifications.component';
import { LetterComponent } from './components/popups/letter/letter.component';


@NgModule({
  declarations: [
    AllNotificationsComponent,
    LetterComponent
  ],
  imports: [
    CommonModule,
    NotificationsRoutingModule
  ]
})
export class NotificationsModule { }
