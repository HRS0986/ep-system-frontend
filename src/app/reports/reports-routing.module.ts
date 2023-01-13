import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportListComponent } from "./components/report-list/report-list.component";
import { CashCollectionReportComponent } from "./components/cash-collection-report/cash-collection-report.component";
import { EpReportComponent } from "./components/ep-report/ep-report.component";
import { CustomerReportComponent } from "./components/customer-report/customer-report.component";
import { ArrearsReportComponent } from "./components/arrears-report/arrears-report.component";

const routes: Routes = [
  { path: "", component: ReportListComponent },
  { path: "cash-collection", component: CashCollectionReportComponent },
  { path: "ep", component: EpReportComponent },
  { path: "customer", component: CustomerReportComponent },
  { path: "arrears", component: ArrearsReportComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
