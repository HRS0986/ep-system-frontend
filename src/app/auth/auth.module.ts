import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { AddEditUserComponent } from './components/popups/add-edit-user/add-edit-user.component';
import { UserProfileComponent } from './components/popups/user-profile/user-profile.component';


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
    AuthRoutingModule
  ]
})
export class AuthModule { }
