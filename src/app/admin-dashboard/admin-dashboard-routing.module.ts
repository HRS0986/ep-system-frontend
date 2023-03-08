import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardRoutes } from "../route-data";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: DashboardRoutes.All.url,
    pathMatch: 'full'
  },
  {
    path: DashboardRoutes.All.url,
    component: DashboardComponent,
    data: {title: DashboardRoutes.All.title}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule {
}
