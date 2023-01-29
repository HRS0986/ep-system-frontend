import { Component, OnInit } from '@angular/core';
import { Common, Customer, LedgerMessages, Particulars } from "../../../constants";
import { Ledger, Customer as CustomerType } from "../../../types";
import { firstValueFrom, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { SettlementComponent } from "../popups/settlement/settlement.component";
import { MatDialog } from "@angular/material/dialog";
import { MakePaymentComponent } from "../popups/make-payment/make-payment.component";
import { CustomerService } from "../../../services/customer.service";
import { CustomerRoutes } from "../../../route-data";
import { ViewOldCustomerComponent } from "../popups/view-old-customer/view-old-customer.component";
import { Location } from "@angular/common";

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location,
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) { }

  MAKE_PAYMENT_BUTTON_TEXT = LedgerMessages.MAKE_PAYMENT_BUTTON_TEXT;
  DATE_COLUMN_TEXT = LedgerMessages.DATE_COLUMN_TEXT;
  REF_NO_COLUMN_TEXT = LedgerMessages.REF_NO_COLUMN_TEXT;
  INST_NO_COLUMN_TEXT = LedgerMessages.INST_NO_COLUMN_TEXT;
  PARTICULARS_COLUMN_TEXT = LedgerMessages.PARTICULARS_COLUMN_TEXT;
  DEBIT_COLUMN_TEXT = LedgerMessages.DEBIT_COLUMN_TEXT;
  CREDIT_COLUMN_TEXT = LedgerMessages.CREDIT_COLUMN_TEXT;
  BALANCE_COLUMN_TEXT = LedgerMessages.BALANCE_COLUMN_TEXT;
  ARREARS_COLUMN_TEXT = LedgerMessages.ARREARS_COLUMN_TEXT;
  REMARKS_COLUMN_TEXT = LedgerMessages.REMARKS_COLUMN_TEXT;
  NO_SEARCH_RESULT = Common.NO_SEARCH_RESULT_TEXT;
  SETTLEMENT_BUTTON_TEXT: string = Customer.SETTLEMENT_BUTTON_TEXT;
  BACK = Customer.BACK;
  MONTHLY_RENTAL = Particulars['MONTHLY_RENTAL'].value;
  customerName!: string;

  displayedColumns: string[] = [
    LedgerMessages.DATE_COLUMN_TEXT,
    LedgerMessages.REF_NO_COLUMN_TEXT,
    LedgerMessages.INST_NO_COLUMN_TEXT,
    LedgerMessages.PARTICULARS_COLUMN_TEXT,
    LedgerMessages.DEBIT_COLUMN_TEXT,
    LedgerMessages.CREDIT_COLUMN_TEXT,
    LedgerMessages.ARREARS_COLUMN_TEXT,
    LedgerMessages.BALANCE_COLUMN_TEXT,
    LedgerMessages.REMARKS_COLUMN_TEXT
  ];
  dataSource: MatTableDataSource<Ledger> = new MatTableDataSource<Ledger>();
  subscriptions: Subscription[] = [];
  customerId!: string;
  isOldCustomer!: boolean;
  customer!: CustomerType;
  isLoading = true;
  isDebug = false;

  ngOnInit(): void {
    const querySubscription = this.route.queryParams
      .subscribe(params => {
          this.customerId = params['id'];
          this.isOldCustomer = params['old'];
          this.customerName = params['name'];
          this.isDebug = params['debug'] == '1';
        }
      );
          console.log(this.isDebug)

    let ledgerSubscription: Subscription;

    if (this.isDebug) {
      ledgerSubscription = this.customerService.GetLedgerDebug(this.customerId)
        .subscribe(ledger => {
            this.dataSource.data = ledger;
            this.isLoading = false;
          }
        );
    }else {
      ledgerSubscription = this.customerService.GetLedger(this.customerId)
        .subscribe(ledger => {
            this.dataSource.data = ledger;
            this.isLoading = false;
          }
        );
    }

    firstValueFrom(this.customerService.GetAClient(this.customerId)).then(client => {
      this.customer = client as CustomerType;
    });

    this.subscriptions.push(querySubscription);
    this.subscriptions.push(ledgerSubscription);
  }

  onClickBack(): void {
    this.location.back();
  }

  onClickMakePayment(): void {
    const dialogRef = this.matDialog.open(MakePaymentComponent, {width: '400px', data:{customer: this.customer}});

    const subscription = dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    this.subscriptions.push(subscription);
  }

  onClickSettle() {
    const dialogRef = this.matDialog.open(SettlementComponent, {width: '400px', data: {customer: this.customer}});

    const subscription = dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    this.subscriptions.push(subscription);
  }

  onClickCustomerName() {
    if (this.isOldCustomer){
      const dialogRef = this.matDialog.open(ViewOldCustomerComponent, { width: "650px", data: this.customer });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }else{
      this.router.navigate([CustomerRoutes.Root, CustomerRoutes.View.url], {queryParams: {id: this.customerId}}).then(() => {
        window.location.reload();
      });
    }
  }

}
