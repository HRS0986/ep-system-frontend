import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { AddEditUserComponent } from './components/popups/add-edit-user/add-edit-user.component';
import { UserProfileComponent } from './components/popups/user-profile/user-profile.component';
import { MaterialModule } from "../app.material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./store/auth.effects";
import { StoreModule } from "@ngrx/store";
import { AUTH_FEATURE_NAME } from "./store/auth.selectors";
import { authReducer } from "./store/auth.reducer";


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ManageUsersComponent,
    AddEditUserComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FormsModule,
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature(AUTH_FEATURE_NAME, authReducer)
  ]
})
export class AuthModule {
}
