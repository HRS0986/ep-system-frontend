import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ArrearsReport, CashCollectionReport, CustomerReport, EPReport, Project } from "../../types";

const COMPONENT = "REPORT";

export const ReportActions = createActionGroup({
    source: COMPONENT,
    events: {
        GET_CUSTOMER_REPORT: emptyProps(),
        GET_CASH_COLLECTION_REPORT: props<{start: string, end: string}>(),
        GET_EP_REPORT: emptyProps(),
        GET_ARREARS_REPORT: emptyProps(),
        GET_CUSTOMER_REPORT_SUCCESS: props<{ reports?: CustomerReport[] }>(),
        GET_CASH_COLLECTION_REPORT_SUCCESS: props<{ reports?: CashCollectionReport[] }>(),
        GET_EP_REPORT_SUCCESS: props<{ reports?: EPReport[] }>(),
        GET_ARREARS_REPORT_SUCCESS: props<{ reports?: ArrearsReport[] }>(),
        GET_CUSTOMER_REPORT_FAILED: props<{ error: string }>(),
        GET_CASH_COLLECTION_REPORT_FAILED: props<{ error: string }>(),
        GET_EP_REPORT_FAILED: props<{ error: string }>(),
        GET_ARREARS_REPORT_FAILED: props<{ error: string }>(),
    }
});
