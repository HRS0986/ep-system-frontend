import { ArrearsReport, CashCollectionReport, CustomerReport, EPReport } from "../../types";

export interface ReportsState {
    EpReport: EPReport;
    CashCollectionReport: CashCollectionReport;
    CustomerReport: CustomerReport;
    ArrearsReport: ArrearsReport;
}
