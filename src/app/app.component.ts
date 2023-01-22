import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { CustomerService } from "./services/customer.service";
import { ReportService } from "./services/report.service";
import { NotificationService } from "./services/notification.service";
import { Title } from "@angular/platform-browser";
import { Common, LoginStatus, NavigationMenu } from "./constants";
import { UserProfileComponent } from "./auth/components/popups/user-profile/user-profile.component";
import { environment } from "../environments/environment";
import { Notification } from "./types";
import { Subscription } from "rxjs";
import { AuthRoutes, CustomerRoutes, NotificationRoutes, ProjectRoutes, ReportRoutes } from "./route-data";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
      private matDialog: MatDialog,
      private router: Router,
      private auth: AuthService,
      private client: CustomerService,
      private report: ReportService,
      private notificationService: NotificationService,
      private titleService: Title
  ) {
    
    this.isLoggedIn = auth.isLoggedIn == LoginStatus.LOGGED_IN;
    this.name = auth.userData?.displayName;
    
    this.router.events.subscribe((event) => {
      this.notificationService.IsAlertsAvailable().then(result => {
        this.hideNotification = result;
      })

      if (event instanceof NavigationStart) {
        this.isFirstLogin = event.url === `/${AuthRoutes.Root}/${AuthRoutes.SignUp}`;
      }
      else if (event instanceof NavigationEnd) {
        // Current URL
        const route = event.url.split('/')[1].split('?')[0];

        // for (const rData in RouterData) {
        //   if (RouterData[rData].url === route) {
        //     this.PageTitle = RouterData[rData].title;
        //     break;
        //   }
        // }
      }
    });

    this.auth.InitAuth((user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
        this.logout();
      }
    });
  }

  COPYRIGHT = Common.COPYRIGHT_TEXT;
  PageTitle = Common.COMPANY_NAME
  CUSTOMERS = NavigationMenu.CUSTOMERS;
  ADVANCED_CUSTOMERS = NavigationMenu.ADVANCED_CUSTOMERS;
  PRESENT_CUSTOMERS = NavigationMenu.EP_CUSTOMERS;
  OLD_CUSTOMERS = NavigationMenu.OLD_CUSTOMERS;
  MANAGE_USERS = NavigationMenu.MANAGE_USERS;
  REPORTS = NavigationMenu.REPORTS;
  PROJECTS = NavigationMenu.PROJECTS;
  REPORT_URL = `/${ReportRoutes.Root}`;
  PROJECTS_URL = `/${ProjectRoutes.Root}`;
  EP_CUSTOMERS_URL = `/${CustomerRoutes.Ep.url}`;
  OLD_CUSTOMERS_URL = `/${CustomerRoutes.Old.url}`;
  ADVANCED_CUSTOMERS_URL = `/${CustomerRoutes.Advanced.url}`;
  MANAGE_USERS_URL = `/${AuthRoutes.ManageUsers.url}`;
  NOTIFICATIONS_URL = `/${NotificationRoutes.Root}`;

  isLoggedIn = false;
  isFirstLogin = false;
  name: string | null | undefined = "";
  notificationCount = 0;
  hideNotification = true;

  subscriptions: Subscription[] = [];
  notifications: Notification[] = [];

  logo: string = `${window.location.protocol}//${window.location.host}/${environment.config.toolbarLogo}`;


  logout() {
    this.auth.SignOut().then(() => {
      this.isLoggedIn = false;
      this.router.navigate([`${AuthRoutes.Root}/${AuthRoutes.Login}`]).then(() => {});
    });
  }

  onClickUserData() {
    const dialogRef = this.matDialog.open(UserProfileComponent, {width: '400px'});

    const subscription = dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit() {
    this.titleService.setTitle(environment.config.appName);
    // this.notificationService.CreateTestAlert('10-01', '');
  }

}
