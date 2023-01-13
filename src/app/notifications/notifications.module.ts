import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { AllNotificationsComponent } from './components/all-notifications/all-notifications.component';


@NgModule({
  declarations: [
    AllNotificationsComponent
  ],
  imports: [
    CommonModule,
    NotificationsRoutingModule
  ]
})
export class NotificationsModule { }
