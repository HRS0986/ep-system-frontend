import { createAction, props } from "@ngrx/store";
import {
    GET_ALL,
    CREATE,
    DELETE,
    UPDATE,
    SUCCESS,
    FAILED,
    CHANGE_INSTALLMENT,
    SETTLEMENT,
    MAKE_PAYMENT, GET
} from "../../app.actions";
import { Customer } from "../../types";

const COMPONENT = "[CUSTOMER]";
const SUB_COMPONENTS = [
    '[EP]',
    '[ADVANCED]',
    '[OLD]',
    '[RESELL]',
    '[LEDGER]'
];

export const getAllEpCustomers = createAction(`${COMPONENT} ${SUB_COMPONENTS[0]} ${GET_ALL}`);
export const getAllAdvancedCustomers = createAction(`${COMPONENT} ${SUB_COMPONENTS[1]} ${GET_ALL}`);
export const getAllOldCustomers = createAction(`${COMPONENT} ${SUB_COMPONENTS[2]} ${GET_ALL}`);
export const getAllResellCustomers = createAction(`${COMPONENT} ${SUB_COMPONENTS[3]} ${GET_ALL}`);

export const getLedger = createAction(`${COMPONENT} ${SUB_COMPONENTS[4]} ${GET}`);

export const createEpCustomer = createAction(`${COMPONENT} ${SUB_COMPONENTS[0]} ${CREATE}`, props<Customer>());
export const createAdvancedCustomer = createAction(`${COMPONENT} ${SUB_COMPONENTS[1]} ${CREATE}`, props<Customer>());
export const createOldCustomer = createAction(`${COMPONENT} ${SUB_COMPONENTS[2]} ${CREATE}`, props<Customer>());
export const createResellCustomer = createAction(`${COMPONENT} ${SUB_COMPONENTS[3]} ${CREATE}`, props<Customer>());

export const removeEpCustomer = createAction(`${COMPONENT} ${SUB_COMPONENTS[0]} ${DELETE}`, props<{id: string}>());
export const removeAdvancedCustomer = createAction(`${COMPONENT} ${SUB_COMPONENTS[1]} ${DELETE}`, props<{id: string}>());
export const removeOldCustomer = createAction(`${COMPONENT} ${SUB_COMPONENTS[2]} ${DELETE}`, props<{id: string}>());
export const removeResellCustomer = createAction(`${COMPONENT} ${SUB_COMPONENTS[3]} ${DELETE}`, props<{id: string}>());

export const updateEpCustomer = createAction(`${COMPONENT} ${SUB_COMPONENTS[0]} ${UPDATE}`, props<Customer>());
export const updateAdvancedCustomer = createAction(`${COMPONENT} ${SUB_COMPONENTS[1]} ${UPDATE}`, props<Customer>());
export const updateOldCustomer = createAction(`${COMPONENT} ${SUB_COMPONENTS[2]} ${UPDATE}`, props<Customer>());
export const updateResellCustomer = createAction(`${COMPONENT} ${SUB_COMPONENTS[3]} ${UPDATE}`, props<Customer>());

export const changeInstallment = createAction(`${COMPONENT} ${SUB_COMPONENTS[0]} ${CHANGE_INSTALLMENT}`, props<Customer>())
export const changeInstallmentSuccess = createAction(`${COMPONENT} ${SUB_COMPONENTS[0]} ${CHANGE_INSTALLMENT} ${SUCCESS}`, props<Customer>())
export const changeInstallmentFailed = createAction(`${COMPONENT} ${SUB_COMPONENTS[0]} ${CHANGE_INSTALLMENT} ${FAILED}`, props<Customer>())

export const makePaymentEpCustomer = createAction(`${COMPONENT} ${SUB_COMPONENTS[0]} ${MAKE_PAYMENT}`, props<Customer>())
export const makePaymentEpCustomerSuccess = createAction(`${COMPONENT} ${SUB_COMPONENTS[0]} ${MAKE_PAYMENT} ${SUCCESS}`, props<Customer>())
export const makePaymentEpCustomerFailed = createAction(`${COMPONENT} ${SUB_COMPONENTS[0]} ${MAKE_PAYMENT} ${FAILED}`, props<Customer>())

export const makePaymentAdvanced = createAction(`${COMPONENT} ${SUB_COMPONENTS[1]} ${MAKE_PAYMENT}`, props<Customer>())
export const makePaymentAdvancedSuccess = createAction(`${COMPONENT} ${SUB_COMPONENTS[1]} ${MAKE_PAYMENT} ${SUCCESS}`, props<Customer>())
export const makePaymentAdvancedFailed = createAction(`${COMPONENT} ${SUB_COMPONENTS[1]} ${MAKE_PAYMENT} ${FAILED}`, props<Customer>())

export const settlement = createAction(`${COMPONENT} ${SUB_COMPONENTS[0]} ${SETTLEMENT}`, props<Customer>())
export const settlementSuccess = createAction(`${COMPONENT} ${SUB_COMPONENTS[0]} ${SETTLEMENT} ${SUCCESS}`, props<Customer>())
export const settlementFailed = createAction(`${COMPONENT} ${SUB_COMPONENTS[0]} ${SETTLEMENT} ${FAILED}`, props<Customer>())

export const getAllEpCustomersSuccess = createAction(`${COMPONENT} ${SUB_COMPONENTS[0]} ${GET_ALL} ${SUCCESS}`);
export const getAllAdvancedCustomersSuccess = createAction(`${COMPONENT} ${SUB_COMPONENTS[1]} ${GET_ALL} ${SUCCESS}`);
export const getAllOldCustomersSuccess = createAction(`${COMPONENT} ${SUB_COMPONENTS[2]} ${GET_ALL} ${SUCCESS}`);
export const getAllResellCustomersSuccess = createAction(`${COMPONENT} ${SUB_COMPONENTS[3]} ${GET_ALL} ${SUCCESS}`);

export const createEpCustomerSuccess = createAction(`${COMPONENT} ${SUB_COMPONENTS[0]} ${CREATE} ${SUCCESS}`);
export const createAdvancedCustomerSuccess = createAction(`${COMPONENT} ${SUB_COMPONENTS[1]} ${CREATE} ${SUCCESS}`);
export const createOldCustomerSuccess = createAction(`${COMPONENT} ${SUB_COMPONENTS[2]} ${CREATE} ${SUCCESS}`);
export const createResellCustomerSuccess = createAction(`${COMPONENT} ${SUB_COMPONENTS[3]} ${CREATE} ${SUCCESS}`);

export const removeEpCustomerSuccess = createAction(`${COMPONENT} ${SUB_COMPONENTS[0]} ${DELETE} ${SUCCESS}`);
export const removeAdvancedCustomerSuccess = createAction(`${COMPONENT} ${SUB_COMPONENTS[1]} ${DELETE} ${SUCCESS}`);
export const removeOldCustomerSuccess = createAction(`${COMPONENT} ${SUB_COMPONENTS[2]} ${DELETE} ${SUCCESS}`);
export const removeResellCustomerSuccess = createAction(`${COMPONENT} ${SUB_COMPONENTS[3]} ${DELETE} ${SUCCESS}`);

export const updateEpCustomerSuccess = createAction(`${COMPONENT} ${SUB_COMPONENTS[0]} ${UPDATE} ${SUCCESS}`);
export const updateAdvancedCustomerSuccess = createAction(`${COMPONENT} ${SUB_COMPONENTS[1]} ${UPDATE} ${SUCCESS}`);
export const updateOldCustomerSuccess = createAction(`${COMPONENT} ${SUB_COMPONENTS[2]} ${UPDATE} ${SUCCESS}`);
export const updateResellCustomerSuccess = createAction(`${COMPONENT} ${SUB_COMPONENTS[3]} ${UPDATE} ${SUCCESS}`);

export const getAllEpCustomersFailed = createAction(`${COMPONENT} ${SUB_COMPONENTS[0]} ${GET_ALL} ${FAILED}`);
export const getAllAdvancedCustomersFailed = createAction(`${COMPONENT} ${SUB_COMPONENTS[1]} ${GET_ALL} ${FAILED}`);
export const getAllOldCustomersFailed = createAction(`${COMPONENT} ${SUB_COMPONENTS[2]} ${GET_ALL} ${FAILED}`);
export const getAllResellCustomersFailed = createAction(`${COMPONENT} ${SUB_COMPONENTS[3]} ${GET_ALL} ${FAILED}`);

export const createEpCustomerFailed = createAction(`${COMPONENT} ${SUB_COMPONENTS[0]} ${CREATE} ${FAILED}`);
export const createAdvancedCustomerFailed = createAction(`${COMPONENT} ${SUB_COMPONENTS[1]} ${CREATE} ${FAILED}`);
export const createOldCustomerFailed = createAction(`${COMPONENT} ${SUB_COMPONENTS[2]} ${CREATE} ${FAILED}`);
export const createResellCustomerFailed = createAction(`${COMPONENT} ${SUB_COMPONENTS[3]} ${CREATE} ${FAILED}`);

export const removeEpCustomerFailed = createAction(`${COMPONENT} ${SUB_COMPONENTS[0]} ${DELETE} ${FAILED}`);
export const removeAdvancedCustomerFailed = createAction(`${COMPONENT} ${SUB_COMPONENTS[1]} ${DELETE} ${FAILED}`);
export const removeOldCustomerFailed = createAction(`${COMPONENT} ${SUB_COMPONENTS[2]} ${DELETE} ${FAILED}`);
export const removeResellCustomerFailed = createAction(`${COMPONENT} ${SUB_COMPONENTS[3]} ${DELETE} ${FAILED}`);

export const updateEpCustomerFailed = createAction(`${COMPONENT} ${SUB_COMPONENTS[0]} ${UPDATE} ${FAILED}`);
export const updateAdvancedCustomerFailed = createAction(`${COMPONENT} ${SUB_COMPONENTS[1]} ${UPDATE} ${FAILED}`);
export const updateOldCustomerFailed = createAction(`${COMPONENT} ${SUB_COMPONENTS[2]} ${UPDATE} ${FAILED}`);
export const updateResellCustomerFailed = createAction(`${COMPONENT} ${SUB_COMPONENTS[3]} ${UPDATE} ${FAILED}`);
