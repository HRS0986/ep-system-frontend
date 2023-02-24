import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagRoutes } from "../route-data";
import { CustomerTagsComponent } from "./components/customer-tags/customer-tags.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: TagRoutes.All.url,
    pathMatch: 'full'
  },
  {
    path: TagRoutes.All.url,
    component: CustomerTagsComponent,
    data: { title: TagRoutes.All.title }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagsRoutingModule {
}
