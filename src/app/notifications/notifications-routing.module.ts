import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationRoutes } from "../route-data";
import { AllNotificationsComponent } from "./components/all-notifications/all-notifications.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: NotificationRoutes.All.url,
        pathMatch: 'full'
    },
    {
        path: NotificationRoutes.All.url,
        component: AllNotificationsComponent,
        data: { title: NotificationRoutes.All.title }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NotificationsRoutingModule {
}
