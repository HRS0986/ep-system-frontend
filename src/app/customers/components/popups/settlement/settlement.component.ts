import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Common, MakePayment, Reports, Settlement, SnackBarStatus } from "../../../../constants";
import { HelperService } from "../../../../services/helper.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatTooltip } from "@angular/material/tooltip";
import { isNumber } from "../../../utils";
import { Customer } from "../../../../types";
import { CustomerService } from "../../../../services/customer.service";

@Component({
  selector: 'app-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.scss']
})
export class SettlementComponent implements OnInit {

  constructor(
      private helperService: HelperService,
      private dialogRef: MatDialogRef<SettlementComponent>,
      @Inject(MAT_DIALOG_DATA) private data: { customer: Customer },
      private customerService: CustomerService
  ) { }

  @ViewChild('refTooltip') refTooltip!: MatTooltip;

  SETTLE_PAYMENT_TITLE = Settlement.SETTLEMENT_TITLE;
  SETTLE_BUTTON_TEXT = Settlement.SETTLE_BUTTON_TEXT;
  REMARKS = Settlement.REMARKS_LABEL;
  REFERENCE_NO = Settlement.REFERENCE_NO_LABEL;
  TOTAL_RECEIVABLE_BALANCE_LABEL = Settlement.TOTAL_RECEIVABLE_BALANCE_LABEL;
  PAID_AMOUNT_LABEL = Settlement.PAID_AMOUNT_LABEL;
  REDUCED_INTEREST_LABEL = Settlement.REDUCED_INTEREST_LABEL;
  BALANCE_LABEL = Settlement.BALANCE_LABEL;
  CANCEL_BUTTON_TEXT = Common.CANCEL_BUTTON_TEXT;
  PARTICULARS_LABEL = Settlement.PARTICULARS_LABEL;
  DATE = Reports.DATE;

  remarks: string = '';
  referenceNo: string = '';
  particulars: string = "Settlement";
  totalReceivableBalance: string = '';
  paidAmount: string = '';
  reducedInterest: string = '';
  settlementBalance: string = '';
  date = new Date();

  ngOnInit(): void {
    this.customerService.GetSettlementBalance(this.data.customer.ID as string).then(result => {
      this.settlementBalance = result.payableBalance.toString();
      this.totalReceivableBalance = this.data.customer.TotalReceivableBalance.toString();
      this.paidAmount = (parseInt(this.totalReceivableBalance) - this.data.customer.Balance!).toString();
      this.reducedInterest = (parseInt(this.totalReceivableBalance) - parseInt(this.settlementBalance)).toString();
    });
  }

  onClickSettle(): void {
    if ((/^\d+$/.test(this.referenceNo) && (parseInt(this.referenceNo) > 0))|| this.referenceNo.length === 0){
      this.refTooltip.message = '';
      this.customerService.Settlement(this.data.customer.ID as string, parseInt(this.referenceNo), this.particulars, this.remarks, this.date).then(result => {
        if (result.status){
          this.dialogRef.close();
          this.helperService.openSnackBar({text:result.message, status: SnackBarStatus.SUCCESS});
        }else{
          this.helperService.openSnackBar({text:result.message, status: SnackBarStatus.FAILED});
        }
      }).catch(err => {
        console.error(err)
        this.helperService.openSnackBar({text:err.message, status: SnackBarStatus.FAILED});
      });
    }else{
      this.refTooltip.disabled = false;
      this.refTooltip.message = MakePayment.ONLY_NUMBER_ALLOWED_MESSAGE_TEXT;
      this.refTooltip.show();
    }
  }

  onChangeRef() {
    const isValidRef = isNumber(this.referenceNo.toString()) && this.referenceNo != null;
    if (isValidRef) {
      this.refTooltip.disabled = true;
    }
  }
}
