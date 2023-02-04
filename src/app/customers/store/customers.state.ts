import { Customer, Ledger } from "../../types";

export interface CustomersState {
  EpCustomers?: Customer[];
  AdvancedCustomers?: Customer[];
  OldCustomers?: Customer[];
  ResaleCustomers?: Customer[];
  Ledgers: Array<{ customerId: string, Ledger?: Ledger[] }>
}

export const initialState: CustomersState = {
  EpCustomers: undefined,
  AdvancedCustomers: undefined,
  OldCustomers: undefined,
  ResaleCustomers: undefined,
  Ledgers: new Array<{ customerId: string, Ledger: Ledger[] }>(),
};
