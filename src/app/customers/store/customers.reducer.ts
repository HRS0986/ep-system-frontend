import { createReducer, on } from "@ngrx/store";
import { CustomersState, initialState } from "./customers.state";
import {
  AdvancedCustomerActions,
  EpCustomerActions,
  LedgerActions,
  OldCustomerActions,
  ResaleCustomerActions
} from "./customers.actions";

export const customerReducer = createReducer(
  initialState,
  on(EpCustomerActions.get_all_success, (state: CustomersState, data) => {
    return {
      ...state,
      EpCustomers: data.customers
    };
  }),
  on(AdvancedCustomerActions.get_all_success, (state: CustomersState, data) => {
    return {
      ...state,
      AdvancedCustomers: data.customers
    };
  }),
  on(OldCustomerActions.get_all_success, (state: CustomersState, data) => {
    debugger;
    return {
      ...state,
      OldCustomers: data.customers
    };
  }),
  on(ResaleCustomerActions.get_all_success, (state: CustomersState, data) => {
    return {
      ...state,
      ResaleCustomers: data.customers
    };
  }),
  on(LedgerActions.get_ledger_success, (state: CustomersState, data) => {
    const alreadyExistingLedgers = state.Ledgers.filter(ld => ld.customerId != data.customerId)
      .map(ld => {
        return { Ledger: ld.Ledger, customerId: ld.customerId }
      });
    return {
      ...state,
      Ledgers: [...alreadyExistingLedgers, { customerId: data.customerId, Ledger: data.ledger }]
    };
  })
);
