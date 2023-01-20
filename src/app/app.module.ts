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
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from "@angular/common/http";
import { AngularFireFunctionsModule, REGION } from "@angular/fire/compat/functions";
import { getFunctions, provideFunctions } from "@angular/fire/functions";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireModule } from "@angular/fire/compat";


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
        HttpClientModule,
        StoreModule.forRoot({}, {}),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        EffectsModule.forRoot([]),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireFunctionsModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideFunctions(() => getFunctions()),
    ],
    providers: [
        { provide: REGION, useValue: 'us-central1' },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
