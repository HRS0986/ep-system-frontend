import { createAction } from "@ngrx/store";
import { GET_ALL, GET, SUCCESS, FAILED } from "../../app.actions";

const COMPONENT = "[REPORT]";
const SUB_COMPONENTS = [
    '[CASH COLLECTION]',
    '[EP]',
    '[CUSTOMER]',
    '[ARREARS]'
];

export const getReportsList = createAction(`${COMPONENT} ${GET_ALL}`);
export const getCashCollectionReport = createAction(`${COMPONENT} ${SUB_COMPONENTS[0]} ${GET}`);
export const getEPReport = createAction(`${COMPONENT} ${SUB_COMPONENTS[1]} ${GET}`);
export const getCustomerReport = createAction(`${COMPONENT} ${SUB_COMPONENTS[2]} ${GET}`);
export const getArrearsReport = createAction(`${COMPONENT} ${SUB_COMPONENTS[3]} ${GET}`);

export const getReportsListSuccess = createAction(`${COMPONENT} ${GET_ALL} ${SUCCESS}`);
export const getCashCollectionReportSuccess = createAction(`${COMPONENT} ${SUB_COMPONENTS[0]} ${GET} ${SUCCESS}`);
export const getEPReportSuccess = createAction(`${COMPONENT} ${SUB_COMPONENTS[1]} ${GET} ${SUCCESS}`);
export const getCustomerReportSuccess = createAction(`${COMPONENT} ${SUB_COMPONENTS[2]} ${GET} ${SUCCESS}`);
export const getArrearsReportSuccess = createAction(`${COMPONENT} ${SUB_COMPONENTS[3]} ${GET} ${SUCCESS}`);

export const  getReportsListFailed = createAction(`${COMPONENT} ${GET_ALL} ${FAILED}`);
export const getCashCollectionReportFailed = createAction(`${COMPONENT} ${SUB_COMPONENTS[0]} ${GET} ${FAILED}`);
export const getEPReportFailed = createAction(`${COMPONENT} ${SUB_COMPONENTS[1]} ${GET} ${FAILED}`);
export const getCustomerReportFailed = createAction(`${COMPONENT} ${SUB_COMPONENTS[2]} ${GET} ${FAILED}`);
export const getArrearsReportFailed = createAction(`${COMPONENT} ${SUB_COMPONENTS[3]} ${GET} ${FAILED}`);
