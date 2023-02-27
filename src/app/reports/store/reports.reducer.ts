import { createReducer, on } from "@ngrx/store";
import { initialState, ReportsState } from "./reports.state";
import { ReportActions } from "./reports.actions";

export const reportsReducer = createReducer(
  initialState,
  on(ReportActions.get_ep_report_success, (state: ReportsState, data) => {
    return {
      ...state,
      epReport: data.reports
    };
  }),
  on(ReportActions.get_arrears_report_success, (state: ReportsState, data) => {
    return {
      ...state,
      arrearsReport: data.reports
    };
  }),
  on(ReportActions.get_cash_collection_report_success, (state: ReportsState, data) => {
    return {
      ...state,
      cashCollectionReport: data.reports
    };
  }),
  on(ReportActions.get_customer_report_success, (state: ReportsState, data) => {
    debugger;
    return {
      ...state,
      customerReport: data.reports
    }
  })
);
