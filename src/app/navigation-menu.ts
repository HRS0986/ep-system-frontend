import { NavigationMenuItem } from "./types";
import { NavigationMenu } from "./constants";
import { AuthRoutes, CustomerRoutes, ProjectRoutes, ReportRoutes, TagRoutes } from "./route-data";

export const NavigationMenuItems: NavigationMenuItem[] = [
  {
    menuText: NavigationMenu.CUSTOMERS,
    iconName: "supervisor_account",
    navigationLink: `/${CustomerRoutes.Root}`,
    subMenuItems: [
      {
        menuText: NavigationMenu.EP_CUSTOMERS,
        iconName: "people",
        navigationLink: `/${CustomerRoutes.Root}/${CustomerRoutes.Ep.url}`,
        subMenuItems: []
      },
      {
        menuText: NavigationMenu.ADVANCED_CUSTOMERS,
        iconName: "perm_contact_calendar",
        navigationLink: `/${CustomerRoutes.Root}/${CustomerRoutes.Advanced.url}`,
        subMenuItems: []
      },
      {
        menuText: NavigationMenu.RESALE_CUSTOMERS,
        iconName: "social_distance",
        navigationLink: `/${CustomerRoutes.Root}/${CustomerRoutes.Resale.url}`,
        subMenuItems: []
      },
      {
        menuText: NavigationMenu.OLD_CUSTOMERS,
        iconName: "3p",
        navigationLink: `/${CustomerRoutes.Root}/${CustomerRoutes.Old.url}`,
        subMenuItems: []
      }
    ]
  },
  {
    menuText: NavigationMenu.REPORTS,
    iconName: "content_paste",
    navigationLink: `/${ReportRoutes.Root}`,
    subMenuItems: [
      {
        menuText: NavigationMenu.CASH_COLLECTION_REPORTS,
        iconName: "local_atm",
        navigationLink: `/${ReportRoutes.Root}/${ReportRoutes.CashCollection.url}`,
        subMenuItems: []
      },
      {
        menuText: NavigationMenu.CUSTOMER_REPORTS,
        iconName: "switch_account",
        navigationLink: `/${ReportRoutes.Root}/${ReportRoutes.Customer.url}`,
        subMenuItems: []
      },
      {
        menuText: NavigationMenu.ARREARS_REPORTS,
        iconName: "pending_actions",
        navigationLink: `/${ReportRoutes.Root}/${ReportRoutes.Arrears.url}`,
        subMenuItems: []
      },
      {
        menuText: NavigationMenu.EP_REPORTS,
        iconName: "location_city",
        navigationLink: `/${ReportRoutes.Root}/${ReportRoutes.Ep.url}`,
        subMenuItems: []
      },
    ]
  },
  {
    menuText: NavigationMenu.PROJECTS,
    iconName: "location_city",
    navigationLink: `/${ProjectRoutes.Root}`,
    subMenuItems: []
  },
  {
    menuText: NavigationMenu.MANAGE_USERS,
    iconName: "manage_accounts",
    navigationLink: `/${AuthRoutes.Root}/${AuthRoutes.ManageUsers.url}`,
    subMenuItems: []
  },
  {
    menuText: NavigationMenu.TAGS,
    iconName: "style",
    navigationLink: `/${TagRoutes.Root}`,
    subMenuItems: []
  }
];
