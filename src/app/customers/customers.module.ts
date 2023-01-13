import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { OldCustomersComponent } from './components/old-customers/old-customers.component';
import { EpCustomersComponent } from './components/ep-customers/ep-customers.component';
import { AdvancedCustomersComponent } from './components/advanced-customers/advanced-customers.component';


@NgModule({
  declarations: [
    OldCustomersComponent,
    EpCustomersComponent,
    AdvancedCustomersComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule
  ]
})
export class CustomersModule { }
