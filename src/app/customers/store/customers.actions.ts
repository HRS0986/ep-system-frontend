import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Customer, Ledger } from "../../types";

const EP_CUSTOMER = 'EP CUSTOMER';
const ADVANCED_CUSTOMER = 'ADVANCED CUSTOMER';
const OLD_CUSTOMER = 'OLD CUSTOMER';
const RESALE_CUSTOMER = 'RESALE CUSTOMER';
const LEDGER = 'LEDGER';

export const EpCustomerActions = createActionGroup({
  source: EP_CUSTOMER,
  events: {
    GET_ALL: emptyProps(),
    GET_ALL_SUCCESS: props<{ customers: Customer[] }>(),
    GET_ALL_FAILED: props<{ error: string }>()
  }
});

export const AdvancedCustomerActions = createActionGroup({
  source: ADVANCED_CUSTOMER,
  events: {
    GET_ALL: emptyProps(),
    GET_ALL_SUCCESS: props<{ customers: Customer[] }>(),
    GET_ALL_FAILED: props<{ error: string }>()
  }
});

export const ResaleCustomerActions = createActionGroup({
  source: RESALE_CUSTOMER,
  events: {
    GET_ALL: emptyProps(),
    GET_ALL_SUCCESS: props<{ customers: Customer[] }>(),
    GET_ALL_FAILED: props<{ error: string }>()
  }
});

export const OldCustomerActions = createActionGroup({
  source: OLD_CUSTOMER,
  events: {
    GET_ALL: emptyProps(),
    GET_ALL_SUCCESS: props<{ customers: Customer[] }>(),
    GET_ALL_FAILED: props<{ error: string }>()
  }
});

export const LedgerActions = createActionGroup({
  source: LEDGER,
  events: {
    GET_LEDGER: props<{ customerId: string }>(),
    GET_LEDGER_SUCCESS: props<{ ledger: Ledger[] }>(),
    GET_LEDGER_FAILED: props<{ error: string }>()
  }
});
