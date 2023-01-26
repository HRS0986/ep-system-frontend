import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerRoutes } from "../route-data";
import { EpCustomersComponent } from "./components/ep-customers/ep-customers.component";
import { AdvancedCustomersComponent } from "./components/advanced-customers/advanced-customers.component";
import { OldCustomersComponent } from "./components/old-customers/old-customers.component";
import { ViewCustomerComponent } from "./components/view-customer/view-customer.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: CustomerRoutes.Ep.url,
        pathMatch: 'full'
    },
    {
        path: CustomerRoutes.Ep.url,
        component: EpCustomersComponent,
        data: { title: CustomerRoutes.Ep.title }
    },
    {
        path: CustomerRoutes.Advanced.url,
        component: AdvancedCustomersComponent,
        data: { title: CustomerRoutes.Advanced.title }
    },
    {
        path: CustomerRoutes.Old.url,
        component: OldCustomersComponent,
        data: { title: CustomerRoutes.Old.title }
    },
    {
        path: CustomerRoutes.View.url,
        component: ViewCustomerComponent,
        data: { title: CustomerRoutes.View.title }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomersRoutingModule {
}
