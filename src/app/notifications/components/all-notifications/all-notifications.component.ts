import { Component, OnInit } from '@angular/core';
import { NotificationColors, Notifications, NotificationTypes, SnackBarStatus } from "../../../constants";
import { MatDialog } from "@angular/material/dialog";
import { HelperService } from "../../../services/helper.service";
import { NotificationService } from "../../../services/notification.service";
import { Notification } from "../../../types";
import { LetterComponent } from "../popups/letter/letter.component";
import { Store } from "@ngrx/store";
import { NotificationsState } from "../../store/notifications.state";
import { notificationSelector } from "../../store/notifications.selectors";
import { NotificationActions } from "../../store/notifications.actions";
import { CustomerRoutes } from "../../../route-data";

@Component({
  selector: 'app-all-notifications',
  templateUrl: './all-notifications.component.html',
  styleUrls: ['./all-notifications.component.scss']
})
export class AllNotificationsComponent implements OnInit {

  NOTIFICATION_TYPES = NotificationTypes;
  NOTIFICATION_COLORS = NotificationColors;
  NOTIFICATION_MESSAGES = Notifications;
  VIEW_CUSTOMER_URL = `/${CustomerRoutes.Root}/${CustomerRoutes.View.url}`;

  notifications: Notification[] = [];
  isLoading = true;

  selectedNotificationType = NotificationTypes.ALL;

  constructor(
    private notificationService: NotificationService,
    private helperService: HelperService,
    private matDialog: MatDialog,
    private store: Store<NotificationsState>
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(NotificationActions.get_all());
    this.store.select(notificationSelector)
      .subscribe(data => {
        if (data == undefined) {
          this.isLoading = true;
        } else {
          data = Array.from(data!);
          this.notifications = data;
          this.isLoading = false;
        }
      })
  }

  onClickMarkAllAsRead() {
    this.notifications.forEach(notification => {
      if (!notification.Seen) {
        this.notificationService.ChangeMartAs(notification.ID, true).then().catch(err => {
          this.helperService.openSnackBar({ text: err.message, status: SnackBarStatus.FAILED });
        });
      }
    });
  }

  onClickMarkAsRead(notification: Notification) {
    notification.Seen = !notification.Seen;
    this.notificationService.ChangeMartAs(notification.ID, notification.Seen).then().catch(error => {
      this.helperService.openSnackBar({ text: error.message, status: SnackBarStatus.FAILED });
    });
  }

  onClickDeleteAll() {
    this.notifications.forEach(notification => {
      this.notificationService.DeleteAlert(notification.ID).then().catch(error => {
        this.helperService.openSnackBar({ text: error.message, status: SnackBarStatus.FAILED });
      });
    });
  }

  onClickDelete(notification: Notification) {
    this.notificationService.DeleteAlert(notification.ID).then().catch(error => {
      this.helperService.openSnackBar({ text: error.message, status: SnackBarStatus.FAILED });
    });
  }


  async getFirstLetter(notification: Notification, address: string = '') {
    await this.notificationService.SendFirstLetter(notification, address);
  }

  async getSecondLetter(notification: Notification, address: string = '') {
    await this.notificationService.SendSecondLetter(notification, address);
  }

  async getLastLetter(notification: Notification, isThird = true, address: string = '') {
    await this.notificationService.SendLastLetter(notification, isThird, address);
  }

  async getLetter(notification: Notification) {
    const dialogRef = this.matDialog.open(LetterComponent, { width: '500px', data: notification });
    dialogRef.afterClosed().subscribe(async result => {
      if (result != false) {
        const arrears = notification.Data.Arrears;
        const address = result[1] ? result[0] : "";
        if (arrears.Days90More != 0) {
          await this.getLastLetter(notification, false, address);
        } else if (arrears.Days90 != 0) {
          await this.getLastLetter(notification, address);
        } else if (arrears.Days60 != 0) {
          await this.getSecondLetter(notification, address);
        } else {
          await this.getFirstLetter(notification, address);
        }
      }
    });
  }

}
