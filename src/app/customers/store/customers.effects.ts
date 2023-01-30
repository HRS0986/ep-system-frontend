import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { ReportsState } from "../../reports/store/reports.state";
import { catchError, from, map, mergeMap, of, withLatestFrom } from "rxjs";
import {
  advancedCustomerSelector,
  epCustomerSelector,
  ledgerSelector,
  oldCustomerSelector
} from "./customers.selectors";
import { AdvancedCustomerActions, EpCustomerActions, LedgerActions, OldCustomerActions } from "./customers.actions";
import { CustomerService } from "../../services/customer.service";


@Injectable()
export class CustomerEffects {
  constructor(private actions$: Actions, private customerService: CustomerService, private store: Store<ReportsState>) {  }

  getEpCustomer$ = createEffect(() => this.actions$.pipe(
    ofType(EpCustomerActions.get_all),
    withLatestFrom(this.store.select(epCustomerSelector)),
    mergeMap(([_, epCustomerData]) => {
      if (!epCustomerData.length) {
        return from(this.customerService.GetAllClientData())
          .pipe(
            map(customerData => EpCustomerActions.get_all_success({ customers: customerData })),
            catchError((error) => of(EpCustomerActions.get_all_failed({ error: error })))
          )
      } else {
        return of(EpCustomerActions.get_all_success({ customers: epCustomerData }));
      }
    })
  ));

  getAdvancedCustomer$ = createEffect(() => this.actions$.pipe(
    ofType(AdvancedCustomerActions.get_all),
    withLatestFrom(this.store.select(advancedCustomerSelector)),
    mergeMap(([_, advancedCustomerData]) => {
      if (!advancedCustomerData.length) {
        return from(this.customerService.GetAllAdvancedClientData())
          .pipe(
            map(customerData => AdvancedCustomerActions.get_all_success({ customers: customerData })),
            catchError((error) => of(AdvancedCustomerActions.get_all_failed({ error: error })))
          )
      } else {
        return of(AdvancedCustomerActions.get_all_success({ customers: advancedCustomerData }));
      }
    })
  ));

  getOldCustomer$ = createEffect(() => this.actions$.pipe(
    ofType(OldCustomerActions.get_all),
    withLatestFrom(this.store.select(oldCustomerSelector)),
    mergeMap(([_, oldCustomerData]) => {
      if (!oldCustomerData.length) {
        return from(this.customerService.GetAllAdvancedClientData())
          .pipe(
            map(customerData => OldCustomerActions.get_all_success({ customers: customerData })),
            catchError((error) => of(OldCustomerActions.get_all_failed({ error: error })))
          )
      } else {
        return of(OldCustomerActions.get_all_success({ customers: oldCustomerData }));
      }
    })
  ));

  getLedger$ = createEffect(() => this.actions$.pipe(
    ofType(LedgerActions.get_ledger),
    withLatestFrom(this.store.select(ledgerSelector)),
    mergeMap(([action, ledgerData]) => {
      if (!ledgerData.length) {
        return from(this.customerService.GetLedger(action.customerId))
          .pipe(
            map(ledger => LedgerActions.get_ledger_success({ ledger: ledger })),
            catchError((error) => of(LedgerActions.get_ledger_failed({ error: error })))
          )
      } else {
        return of(LedgerActions.get_ledger_success({ ledger: ledgerData }));
      }
    })
  ));

}
