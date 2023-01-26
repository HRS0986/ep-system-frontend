import { ArrearsReport, CashCollectionReport, CustomerReport, EPReport } from "../../types";

export interface ReportsState {
    epReport: EPReport[];
    cashCollectionReport: CashCollectionReport[];
    customerReport: CustomerReport[];
    arrearsReport: ArrearsReport[];
}

export const initialState: ReportsState = {
    epReport: new Array<EPReport>(),
    cashCollectionReport: new Array<CashCollectionReport>(),
    customerReport: new Array<CustomerReport>(),
    arrearsReport: new Array<ArrearsReport>()
}
