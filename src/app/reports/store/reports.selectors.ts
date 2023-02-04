import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ReportsState } from "./reports.state";

export const REPORTS_FEATURE_NAME = 'reports';

const getReportsState = createFeatureSelector<ReportsState>(REPORTS_FEATURE_NAME);

export const cashCollectionReportSelector = createSelector(getReportsState, state => state.cashCollectionReport);
export const customerReportSelector = createSelector(getReportsState, state => state.customerReport);
export const epReportSelector = createSelector(getReportsState, state => state.epReport);
export const arrearsReportSelector = createSelector(getReportsState, state => state.arrearsReport);
