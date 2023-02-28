import { ProjectsState } from "../projects/store/projects.state";
import { CustomersState } from "../customers/store/customers.state";
import { NotificationsState } from "../notifications/store/notifications.state";
import { AuthState } from "../auth/store/auth.state";
import { TagsState } from "../tags/store/tags.state";

export interface AppState {
  ProjectsState: ProjectsState;
  CustomersState: CustomersState;
  NotificationsState: NotificationsState;
  AuthState: AuthState;
  TagsState: TagsState
}
