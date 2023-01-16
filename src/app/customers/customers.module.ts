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
    LedgerComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule
  ]
})
export class CustomersModule { }
