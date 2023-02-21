import { Component, Inject, OnInit } from '@angular/core';
import { Common, ErrorMessages, Reports, Settlement, SnackBarStatus } from "../../../../constants";
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

  DATE = Reports.DATE;
  VALIDATION_MESSAGES = ErrorMessages;
  SETTLEMENT_MESSAGES = Settlement;
  CANCEL_BUTTON_TEXT = Common.CANCEL_BUTTON_TEXT;

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
}
