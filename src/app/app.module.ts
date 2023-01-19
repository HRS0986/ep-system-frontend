import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomersModule } from './customers/customers.module';
import { ReportsModule } from './reports/reports.module';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from "./app.material.module";
import { ProjectsModule } from "./projects/projects.module";
import { NotificationsModule } from './notifications/notifications.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { NotFoundComponent } from './not-found/not-found.component';
import { DeleteConfirmPopupComponent } from './delete-confirm-popup/delete-confirm-popup.component';


@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
        DeleteConfirmPopupComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CustomersModule,
        ReportsModule,
        AuthModule,
        MaterialModule,
        ProjectsModule,
        NotificationsModule,
        StoreModule.forRoot({}, {}),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
