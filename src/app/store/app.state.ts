import { ProjectsState } from "../projects/store/projects.state";
import { CustomersState } from "../customers/store/customers.state";
import { NotificationsState } from "../notifications/store/notifications.state";
import { ReportsState } from "../reports/store/reports.state";
import { AuthState } from "../auth/store/auth.state";

export interface AppState {
    ProjectsState: ProjectsState;
    CustomersState: CustomersState;
    NotificationsState: NotificationsState;
    ReportsState: ReportsState;
    AuthState: AuthState;
}

