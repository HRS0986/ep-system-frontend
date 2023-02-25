import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { CustomerTagsComponent } from './components/customer-tags/customer-tags.component';
import { AddEditTagComponent } from './components/popups/add-edit-tag/add-edit-tag.component';
import { MaterialModule } from "../app.material.module";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    CustomerTagsComponent,
    AddEditTagComponent
  ],
  imports: [
    CommonModule,
    TagsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class TagsModule {
}
