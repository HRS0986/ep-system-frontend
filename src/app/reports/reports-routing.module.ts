import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportListComponent } from "./components/report-list/report-list.component";
import { CashCollectionReportComponent } from "./components/cash-collection-report/cash-collection-report.component";
import { EpReportComponent } from "./components/ep-report/ep-report.component";
import { CustomerReportComponent } from "./components/customer-report/customer-report.component";
import { ArrearsReportComponent } from "./components/arrears-report/arrears-report.component";
import { ReportRoutes } from "../route-data";

const routes: Routes = [
    {
        path: '',
        redirectTo: ReportRoutes.All.url,
        pathMatch: 'full'
    },
    {
        path: ReportRoutes.All.url,
        component: ReportListComponent,
        data: { title: ReportRoutes.All.title }
    },
    {
        path: ReportRoutes.CashCollection.url,
        component: CashCollectionReportComponent,
        data: { title: ReportRoutes.CashCollection.title }
    },
    {
        path: ReportRoutes.Ep.url,
        component: EpReportComponent,
        data: { title: ReportRoutes.Ep.title }
    },
    {
        path: ReportRoutes.Customer.url,
        component: CustomerReportComponent,
        data: { title: ReportRoutes.Customer.title }
    },
    {
        path: ReportRoutes.Arrears.url,
        component: ArrearsReportComponent,
        data: { title: ReportRoutes.Arrears.title }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportsRoutingModule {
}
