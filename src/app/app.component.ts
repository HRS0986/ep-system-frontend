import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { NotificationService } from "./services/notification.service";
import { Title } from "@angular/platform-browser";
import { Common, LoginStatus } from "./constants";
import { UserProfileComponent } from "./auth/components/popups/user-profile/user-profile.component";
import { environment } from "../environments/environment";
import { Notification } from "./types";
import { AuthRoutes, NotificationRoutes } from "./route-data";
import { NavigationMenuItems } from "./navigation-menu";
import { filter, map, mergeMap } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
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

  private rootRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.rootRoute(this.activatedRoute)),
      filter((route: ActivatedRoute) => route.outlet === 'primary'),
      mergeMap((route: ActivatedRoute) => route.data)
    ).subscribe((event: { [name: string]: any }) => {
      this.PageTitle = event['title'];
      this.titleService.setTitle(environment.config.appName);
    });
  }

}
