import { Component, OnInit } from '@angular/core';
import { Common, Customer, LedgerMessages, Particulars } from "../../../constants";
import { Customer as CustomerType, Ledger } from "../../../types";
import { ActivatedRoute, Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { SettlementComponent } from "../popups/settlement/settlement.component";
import { MatDialog } from "@angular/material/dialog";
import { MakePaymentComponent } from "../popups/make-payment/make-payment.component";
import { CustomerService } from "../../../services/customer.service";
import { CustomerRoutes } from "../../../route-data";
import { ViewOldCustomerComponent } from "../popups/view-old-customer/view-old-customer.component";
import { Location } from "@angular/common";
import { Store } from "@ngrx/store";
import { CustomersState } from "../../store/customers.state";
import { ledgerSelector, singleCustomerSelector } from "../../store/customers.selectors";
import { LedgerActions } from "../../store/customers.actions";

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
    private customerService: CustomerService,
    private store: Store<CustomersState>
  ) {
  }

  SETTLEMENT_BUTTON_TEXT: string = Customer.SETTLEMENT_BUTTON_TEXT;
  LEDGER_MESSAGES = LedgerMessages;
  COMMON_MESSAGES = Common;

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
  customerId!: string;
  isOldCustomer!: boolean;
  customer!: CustomerType;
  isLoading = true;
  isDebug = false;

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          this.customerId = params['id'];
          this.isOldCustomer = params['old'];
          this.customerName = params['name'];
          this.isDebug = params['debug'] == '1';
          this.store.select(singleCustomerSelector(this.customerId)).subscribe(data => {
            this.customer = data!;
          })
        }
      );

    if (this.isDebug) {
      this.customerService.GetLedgerDebug(this.customerId)
        .subscribe(ledger => {
            this.dataSource.data = ledger;
            this.isLoading = false;
          }
        );
    } else {
      this.store.select(ledgerSelector)
        .subscribe(data => {
          if (data == undefined) {
            this.isLoading = true;
          } else {
            let relatedLedger = data.find(l => l.customerId == this.customerId)!.Ledger
            relatedLedger = Array.from(relatedLedger!);
            this.dataSource = new MatTableDataSource(relatedLedger);
            this.isLoading = false;
          }
        })
      this.store.dispatch(LedgerActions.get_ledger({ customerId: this.customerId }));
    }
  }

  onClickBack(): void {
    this.location.back();
  }

  onClickMakePayment(): void {
    this.matDialog.open(MakePaymentComponent, {
      width: '400px',
      data: this.customer
    }).afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onClickSettle() {
    const dialogRef = this.matDialog.open(SettlementComponent, { width: '400px', data: { customer: this.customer } });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onClickCustomerName() {
    if (this.isOldCustomer) {
      const dialogRef = this.matDialog.open(ViewOldCustomerComponent, { width: "650px", data: this.customer });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    } else {
      this.router.navigate([CustomerRoutes.Root, CustomerRoutes.View.url], { queryParams: { id: this.customerId } }).then(() => {
        window.location.reload();
      });
    }
  }

}
