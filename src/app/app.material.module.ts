import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from "@angular/material/sort";
import { MatStepperModule } from '@angular/material/stepper';


const materialModules = [
    MatGridListModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatInputModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatTabsModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSortModule,
    MatStepperModule,
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ...materialModules
    ],
    exports: materialModules
})

export class MaterialModule {
}
