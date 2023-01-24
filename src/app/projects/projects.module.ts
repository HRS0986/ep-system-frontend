import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { AllProjectsComponent } from './components/all-projects/all-projects.component';
import { AddEditProjectComponent } from './components/popups/add-edit-project/add-edit-project.component';
import { MaterialModule } from "../app.material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ActionMenuComponent } from './components/action-menu/action-menu.component';
import { HttpClientModule } from "@angular/common/http";
import { EffectsModule } from "@ngrx/effects";
import { ProjectsEffects } from "./store/projects.effects";
import { StoreModule } from "@ngrx/store";
import { projectsReducer } from "./store/projects.reducer";
import { PROJECT_FEATURE_NAME } from "./store/projects.selectors";


@NgModule({
    declarations: [
        AllProjectsComponent,
        AddEditProjectComponent,
        ActionMenuComponent
    ],
    imports: [
        CommonModule,
        ProjectsRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        HttpClientModule,
        EffectsModule.forFeature([ProjectsEffects]),
        StoreModule.forFeature(PROJECT_FEATURE_NAME, projectsReducer)
    ]
})
export class ProjectsModule {
}
