import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { HelperService } from "../../../services/helper.service";
import { ActionMenuItem, Customer as CustomerType } from "../../../types";
import { AllCustomers, Common, Customer, LedgerMessages, SnackBarStatus } from "../../../constants";
import { DeleteConfirmPopupComponent } from "../../../delete-confirm-popup/delete-confirm-popup.component";
import { CustomerService } from "../../../services/customer.service";
import { CustomerRoutes } from "../../../route-data";
import { MakePaymentComponent } from "../popups/make-payment/make-payment.component";
import { SettlementComponent } from "../popups/settlement/settlement.component";
import { ChangeInstallmentComponent } from "../popups/change-installment/change-installment.component";

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss']
})
export class ActionMenuComponent implements OnInit {

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private customerService: CustomerService,
    private helperService: HelperService
  ) {
  }

  @Input() customer!: CustomerType;

  ACTION_MENU_ITEMS: ActionMenuItem<ActionMenuComponent>[] = [
    {
      actionText: AllCustomers.VIEW_BUTTON_TEXT,
      iconName: 'contact_page',
      action: "onClickViewCustomer"
    },
    {
      actionText: AllCustomers.LEDGER_BUTTON_TEXT,
      iconName: 'account_balance_wallet',
      action: "onClickViewLedger"
    },
    {
      actionText: LedgerMessages.MAKE_PAYMENT_BUTTON_TEXT,
      iconName: 'local_atm',
      action: "onClickMakePayment"
    },
    {
      actionText: AllCustomers.SETTLE_PAYMENT_BUTTON_TEXT,
      iconName: 'credit_card',
      action: "onClickSettle"
    },
    {
      actionText: AllCustomers.CHANGE_INSTALLMENT_BUTTON_TEXT,
      iconName: 'price_change',
      action: "onClickChangeInstallment"
    },
    {
      actionText: Common.DELETE_BUTTON_TEXT,
      iconName: 'delete',
      action: "onClickDelete"
    },
  ];

  ngOnInit(): void {
  }

  onClickViewCustomer() {
    this.router.navigate([CustomerRoutes.Root, CustomerRoutes.View.url], { queryParams: { id: this.customer.ID } }).then();
  }

  onClickViewLedger() {
    this.router.navigate([CustomerRoutes.Root, CustomerRoutes.Ledger.url], { queryParams: { id: this.customer.ID, name: this.customer.Name } }).then();
  }

  onClickChangeInstallment(): void {
    const dialogRef = this.matDialog.open(ChangeInstallmentComponent, {width: '500px', data: {customer: this.customer}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onClickSettle() {
    const dialogRef = this.matDialog.open(SettlementComponent, {width: '500px', data: {customer: this.customer}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onClickMakePayment(): void {
    const dialogRef = this.matDialog.open(MakePaymentComponent, { width: '600px', data: this.customer });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onClickDelete() {
    const dialogRef = this.matDialog.open(DeleteConfirmPopupComponent, {
      width: '350px',
      data: {
        title: Customer.DELETE_CUSTOMER_TITLE,
        body: Customer.DELETE_CUSTOMER_MESSAGE,
        entityName: this.customer.Name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.customerService.DeleteClient(this.customer.ID).then(() => {
          this.helperService.openSnackBar({
            text: Customer.DELETE_CUSTOMER_TEXT,
            status: SnackBarStatus.SUCCESS
          })
        })
      }
    });
  }

  invokeAction(action: keyof ActionMenuComponent) {
    (this[action] as (() => void))();
  }

}
