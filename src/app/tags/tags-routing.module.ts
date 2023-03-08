import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagRoutes } from "../route-data";
import { AllTagsComponent } from "./components/all-tags/all-tags.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: TagRoutes.All.url,
    pathMatch: 'full'
  },
    {
        path: TagRoutes.All.url,
        component: AllTagsComponent,
        data: {title: TagRoutes.All.title}
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagsRoutingModule {
}
