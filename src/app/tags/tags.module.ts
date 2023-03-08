import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { AllTagsComponent } from './components/all-tags/all-tags.component';
import { AddEditTagComponent } from './components/popups/add-edit-tag/add-edit-tag.component';
import { MaterialModule } from "../app.material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ActionMenuComponent } from './components/action-menu/action-menu.component';
import { StoreModule } from "@ngrx/store";
import { TAGS_FEATURE_NAME } from "./store/tags.selectors";
import { tagsReducer } from "./store/tags.reducer";
import { EffectsModule } from "@ngrx/effects";
import { TagsEffects } from "./store/tags.effects";


@NgModule({
  declarations: [
      AllTagsComponent,
      AddEditTagComponent,
      ActionMenuComponent
  ],
  imports: [
    CommonModule,
    TagsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature(TAGS_FEATURE_NAME, tagsReducer),
    EffectsModule.forFeature([TagsEffects])
  ]
})
export class TagsModule {
}
