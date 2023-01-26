import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, from, map, mergeMap, of, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { ReportService } from "../../services/report.service";
import { ReportsState } from "./reports.state";
import { ReportActions } from "./reports.actions";
import {
    arrearsReportSelector,
    cashCollectionReportSelector,
    customerReportSelector,
    epReportSelector
} from "./reports.selectors";

@Injectable()
export class ReportEffects {

    constructor(private actions$: Actions, private reportService: ReportService, private store: Store<ReportsState>) {
    }

    getEpReport$ = createEffect(() => this.actions$.pipe(

        ofType(ReportActions.get_ep_report),
        withLatestFrom(this.store.select(epReportSelector)),
        mergeMap(([_, reportsData]) => {
            if (!reportsData.length) {
                return from(this.reportService.GetEPReport())
                    .pipe(
                        map(reportsData => ReportActions.get_ep_report_success({ reports: reportsData.data })),
                        catchError((error) => of(ReportActions.get_ep_report_failed({ error: error })))
                    )
            } else {
                return of(ReportActions.get_ep_report_success({ reports: reportsData }))
            }
        })
    ));
    getCustomerReport$ = createEffect(() => this.actions$.pipe(
        ofType(ReportActions.get_customer_report),
        withLatestFrom(this.store.select(customerReportSelector)),
        mergeMap(([_, reportsData]) => {
            if (!reportsData.length) {
                return from(this.reportService.GetCustomerReport())
                    .pipe(
                        map(reportsData => ReportActions.get_customer_report_success({ reports: reportsData.data })),
                        catchError((error) => of(ReportActions.get_customer_report_failed({ error: error })))
                    )
            } else {
                return of(ReportActions.get_customer_report_success({ reports: reportsData }))
            }
        })
    ));

    getArrearsReport$ = createEffect(() => this.actions$.pipe(
        ofType(ReportActions.get_arrears_report),
        withLatestFrom(this.store.select(arrearsReportSelector)),
        mergeMap(([_, reportsData]) => {
            if (!reportsData.length) {
                return from(this.reportService.GetArrearsReport())
                    .pipe(
                        map(reportsData => ReportActions.get_arrears_report_success({ reports: reportsData.data })),
                        catchError((error) => of(ReportActions.get_arrears_report_failed({ error: error })))
                    )
            } else {
                return of(ReportActions.get_arrears_report_success({ reports: reportsData }))
            }
        })
    ));

    getCashCollectionReport$ = createEffect(() => this.actions$.pipe(
        ofType(ReportActions.get_cash_collection_report),
        withLatestFrom(this.store.select(cashCollectionReportSelector)),
        mergeMap(([actionData, reportsData]) => {
            if (!reportsData.length) {
                return from(this.reportService.GetCashCollectionReport(actionData.start, actionData.end))
                    .pipe(
                        map(reportsData => ReportActions.get_cash_collection_report_success({ reports: reportsData.data })),
                        catchError((error) => of(ReportActions.get_cash_collection_report_failed({ error: error })))
                    )
            } else {
                return of(ReportActions.get_cash_collection_report_success({ reports: reportsData }))
            }
        })
    ));

}
