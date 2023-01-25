import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { NotificationService } from "./services/notification.service";
import { Title } from "@angular/platform-browser";
import { Common, LoginStatus } from "./constants";
import { UserProfileComponent } from "./auth/components/popups/user-profile/user-profile.component";
import { environment } from "../environments/environment";
import { Notification } from "./types";
import { AuthRoutes, NotificationRoutes } from "./route-data";
import { NavigationMenuItems } from "./navigation-menu";

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
            } else if (event instanceof NavigationEnd) {
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

    NOTIFICATIONS_URL = `/${NotificationRoutes.Root}`;
    navigationMenuItems = NavigationMenuItems;

    isLoggedIn = false;
    isFirstLogin = false;
    name: string | null | undefined = "";
    notificationCount = 0;
    hideNotification = true;
    notifications: Notification[] = [];

    logo: string = `${window.location.protocol}//${window.location.host}/${environment.config.toolbarLogo}`;


    logout() {
        this.auth.SignOut().then(() => {
            this.isLoggedIn = false;
            this.router.navigate([`${AuthRoutes.Root}/${AuthRoutes.Login}`]).then(() => {
            });
        });
    }

    onClickUserData() {
        const dialogRef = this.matDialog.open(UserProfileComponent, { width: '400px' });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    ngOnInit() {
        this.titleService.setTitle(environment.config.appName);
        // this.notificationService.CreateTestAlert('10-01', '');
    }

}
