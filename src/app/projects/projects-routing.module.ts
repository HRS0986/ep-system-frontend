import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectRoutes } from "../route-data";
import { AllProjectsComponent } from "./components/all-projects/all-projects.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: ProjectRoutes.All.url,
        pathMatch: 'full'
    },
    {
        path: ProjectRoutes.All.url,
        component: AllProjectsComponent,
        data: { title: ProjectRoutes.All.title }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectsRoutingModule {
}
