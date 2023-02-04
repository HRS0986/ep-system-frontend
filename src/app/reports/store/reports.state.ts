import { ArrearsReport, CashCollectionReport, CustomerReport, EPReport } from "../../types";

export interface ReportsState {
    epReport?: EPReport[];
    cashCollectionReport?: CashCollectionReport[];
    customerReport?: CustomerReport[];
    arrearsReport?: ArrearsReport[];
}

export const initialState: ReportsState = {
    epReport: undefined,
    cashCollectionReport: undefined,
    customerReport: undefined,
    arrearsReport: undefined
}
