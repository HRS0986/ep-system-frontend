import { Component, Inject, OnInit } from '@angular/core';
import { Common, MakePayment, Reports, Settlement, SnackBarStatus } from "../../../../constants";
import { HelperService } from "../../../../services/helper.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Customer } from "../../../../types";
import { CustomerService } from "../../../../services/customer.service";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.scss']
})
export class SettlementComponent implements OnInit {

  constructor(
    private helperService: HelperService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SettlementComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { customer: Customer },
    private customerService: CustomerService
  ) {
  }

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

  totalReceivableBalance: string = '';
  paidAmount: string = '';
  reducedInterest: string = '';
  settlementBalance: string = '';

  settlementForm = this.formBuilder.group({
    remarks: this.formBuilder.control(""),
    referenceNo: this.formBuilder.control("", [Validators.pattern(Settlement.NUMBERS_REGEX)]),
    particulars: this.formBuilder.control(""),
    date: this.formBuilder.control(new Date())
  });

  ngOnInit(): void {
    this.customerService.GetSettlementBalance(this.data.customer.ID as string).then(result => {
      this.settlementBalance = result.payableBalance.toString();
      this.totalReceivableBalance = this.data.customer.TotalReceivableBalance.toString();
      this.paidAmount = (parseInt(this.totalReceivableBalance) - this.data.customer.Balance!).toString();
      this.reducedInterest = (parseInt(this.totalReceivableBalance) - parseInt(this.settlementBalance)).toString();
    });
  }

  onClickSettle(): void {
    if (this.settlementForm.valid) {
      this.customerService.Settlement(
        this.data.customer.ID as string,
        parseInt(this.settlementForm.value.referenceNo),
        this.settlementForm.value.particulars,
        this.settlementForm.value.remarks,
        this.settlementForm.value.date
      ).then(result => {
        if (result.status) {
          this.dialogRef.close();
          this.helperService.openSnackBar({ text: result.message, status: SnackBarStatus.SUCCESS });
        } else {
          this.helperService.openSnackBar({ text: result.message, status: SnackBarStatus.FAILED });
        }
      }).catch(err => {
        console.error(err)
        this.helperService.openSnackBar({ text: err.message, status: SnackBarStatus.FAILED });
      });
    }
  }

  getErrorMessage() {
    console.log(this.settlementForm.value.referenceNo.invalid);
    if (this.settlementForm.controls['referenceNo'].hasError('pattern')) {
      return MakePayment.ONLY_NUMBER_ALLOWED_MESSAGE_TEXT;
    }
    return '';
  }
}
