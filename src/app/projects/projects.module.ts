import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { AllProjectsComponent } from './components/all-projects/all-projects.component';
import { AddEditProjectComponent } from './components/popups/add-edit-project/add-edit-project.component';


@NgModule({
  declarations: [
    AllProjectsComponent,
    AddEditProjectComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
