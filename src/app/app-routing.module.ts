import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from "./not-found/not-found.component";
import { LoginRequiredGuard } from "./guards/login-required.guard";
import { AuthRoutes, CustomerRoutes, NotificationRoutes, ProjectRoutes, ReportRoutes } from "./route-data";


const routes: Routes = [
    {
        path: '',
        redirectTo: `/${CustomerRoutes.Root}`,
        pathMatch: 'full'
    },
    {
        path: CustomerRoutes.Root,
        loadChildren: () => import("./customers/customers.module").then(m => m.CustomersModule),
        canActivate: [LoginRequiredGuard]
    },
    {
        path: ReportRoutes.Root,
        loadChildren: () => import("./reports/reports.module").then(m => m.ReportsModule),
        canActivate: [LoginRequiredGuard]
    },
    {
        path: AuthRoutes.Root,
        loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
    },
    {
        path: NotificationRoutes.Root,
        loadChildren: () => import("./notifications/notifications.module").then(m => m.NotificationsModule),
        canActivate: [LoginRequiredGuard]
    },
    {
        path: ProjectRoutes.Root,
        loadChildren: () => import("./projects/projects.module").then(m => m.ProjectsModule),
        canActivate: [LoginRequiredGuard]
    },
    {
        path: "**",
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
