import { Customer } from "../../types";

export interface CustomersState {
    EpCustomers: Customer[];
    AdvancedCustomers: Customer[];
    OldCustomers: Customer[];
    ResellCustomers: Customer[];
}

export const initialState: CustomersState = {
    EpCustomers: new Array<Customer>(),
    AdvancedCustomers: new Array<Customer>(),
    OldCustomers: new Array<Customer>(),
    ResellCustomers: new Array<Customer>(),
};
