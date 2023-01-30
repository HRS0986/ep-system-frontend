import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CustomersState } from "./customers.state";

export const CUSTOMERS_FEATURE_NAME = 'customers';

const getCustomerState = createFeatureSelector<CustomersState>(CUSTOMERS_FEATURE_NAME);

export const epCustomerSelector = createSelector(getCustomerState, state => state.EpCustomers);
export const advancedCustomerSelector = createSelector(getCustomerState, state => state.AdvancedCustomers);
export const resaleCustomerSelector = createSelector(getCustomerState, state => state.ResaleCustomers);
export const oldCustomerSelector = createSelector(getCustomerState, state => state.OldCustomers);
export const ledgerSelector = createSelector(getCustomerState, state => state.Ledger);
