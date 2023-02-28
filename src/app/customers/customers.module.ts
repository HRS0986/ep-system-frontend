import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { OldCustomersComponent } from './components/old-customers/old-customers.component';
import { EpCustomersComponent } from './components/ep-customers/ep-customers.component';
import { AdvancedCustomersComponent } from './components/advanced-customers/advanced-customers.component';
import { ViewOldCustomerComponent } from './components/popups/view-old-customer/view-old-customer.component';
import { AddNewCustomerComponent } from './components/popups/add-new-customer/add-new-customer.component';
import { MakePaymentComponent } from './components/popups/make-payment/make-payment.component';
import { ChangeInstallmentComponent } from './components/popups/change-installment/change-installment.component';
import { SettlementComponent } from './components/popups/settlement/settlement.component';
import { LedgerComponent } from './components/ledger/ledger.component';
import { MaterialModule } from "../app.material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ViewCustomerComponent } from './components/view-customer/view-customer.component';
import { NgxMaskModule } from "ngx-mask";
import { ActionMenuComponent } from './components/action-menu/action-menu.component';
import { CustomerTablesComponent } from './components/customer-tables/customer-tables.component';
import { StoreModule } from "@ngrx/store";
import { CUSTOMERS_FEATURE_NAME } from "./store/customers.selectors";
import { customerReducer } from "./store/customers.reducer";
import { EffectsModule } from "@ngrx/effects";
import { CustomerEffects } from "./store/customers.effects";
import { ResaleCustomersComponent } from './components/resale-customers/resale-customers.component';


@NgModule({
    declarations: [
        OldCustomersComponent,
        EpCustomersComponent,
      AdvancedCustomersComponent,
      ViewOldCustomerComponent,
      AddNewCustomerComponent,
      MakePaymentComponent,
      ChangeInstallmentComponent,
      SettlementComponent,
      LedgerComponent,
      ViewCustomerComponent,
      ActionMenuComponent,
      CustomerTablesComponent,
      ResaleCustomersComponent,
    ],
    imports: [
        CommonModule,
        CustomersRoutingModule,
        MaterialModule,
        FormsModule,
        NgxMaskModule.forChild(),
        ReactiveFormsModule,
        StoreModule.forFeature(CUSTOMERS_FEATURE_NAME, customerReducer),
        EffectsModule.forFeature([CustomerEffects])
    ]
})
export class CustomersModule {
}
