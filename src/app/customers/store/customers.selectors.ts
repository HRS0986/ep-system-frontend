import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CustomersState } from "./customers.state";

export const CUSTOMERS_FEATURE_NAME = 'customers';

const getCustomerState = createFeatureSelector<CustomersState>(CUSTOMERS_FEATURE_NAME);

export const epCustomerSelector = createSelector(getCustomerState, state => state.EpCustomers);
export const advancedCustomerSelector = createSelector(getCustomerState, state => state.AdvancedCustomers);
export const resaleCustomerSelector = createSelector(getCustomerState, state => state.ResaleCustomers);
export const oldCustomerSelector = createSelector(getCustomerState, state => state.OldCustomers);
export const ledgerSelector = createSelector(getCustomerState, state => state.Ledgers);
export const singleCustomerSelector = (customerId: string) =>  createSelector(getCustomerState, state => {
  let allCustomers = [];
  if (state.EpCustomers != undefined) {
    allCustomers.push(...state.EpCustomers)
  }
  if (state.AdvancedCustomers != undefined) {
    allCustomers.push(...state.AdvancedCustomers)
  }
  if (state.OldCustomers != undefined) {
    allCustomers.push(...state.OldCustomers)
  }
  if (state.ResaleCustomers != undefined) {
    allCustomers.push(...state.ResaleCustomers)
  }
  return allCustomers.find(c => c.ID == customerId);
});
