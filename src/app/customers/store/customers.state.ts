import { Customer, Ledger } from "../../types";

export interface CustomersState {
  EpCustomers: Customer[];
  AdvancedCustomers: Customer[];
  OldCustomers: Customer[];
  ResaleCustomers: Customer[];
  Ledgers: Array<{ customerId: string, Ledger: Ledger[] }>
}

export const initialState: CustomersState = {
  EpCustomers: new Array<Customer>(),
  AdvancedCustomers: new Array<Customer>(),
  OldCustomers: new Array<Customer>(),
  ResaleCustomers: new Array<Customer>(),
  Ledgers: new Array<{ customerId: string, Ledger: Ledger[] }>()
};
