import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutes } from "../route-data";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { UserProfileComponent } from "./components/popups/user-profile/user-profile.component";
import { ManageUsersComponent } from "./components/manage-users/manage-users.component";
import { LoginRequiredGuard } from "../guards/login-required.guard";
import { PreventLoginGuard } from "../guards/prevent-login.guard";
import { IsAdminGuard } from "../guards/is-admin.guard";
import { SignupGuard } from "../guards/signup.guard";

const routes: Routes = [
    {
        path: AuthRoutes.Login,
        component: LoginComponent,
        canActivate: [PreventLoginGuard]
    },
    {
        path: AuthRoutes.SignUp,
        component: SignupComponent,
        canActivate: [SignupGuard]
    },
    {
        path: AuthRoutes.Profile,
        component: UserProfileComponent,
        canActivate: [LoginRequiredGuard]
    },
    {
        path: AuthRoutes.ManageUsers.url,
        component: ManageUsersComponent,
        canActivate: [LoginRequiredGuard, IsAdminGuard],
        data: { title: AuthRoutes.ManageUsers.title }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
