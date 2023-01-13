import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { CashCollectionReportComponent } from './components/cash-collection-report/cash-collection-report.component';
import { ArrearsReportComponent } from './components/arrears-report/arrears-report.component';
import { CustomerReportComponent } from './components/customer-report/customer-report.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { EpReportComponent } from './components/ep-report/ep-report.component';


@NgModule({
  declarations: [
    CashCollectionReportComponent,
    ArrearsReportComponent,
    CustomerReportComponent,
    ReportListComponent,
    EpReportComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
