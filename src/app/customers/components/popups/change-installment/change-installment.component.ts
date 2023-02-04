import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ChangeInstallment, Common, MakePayment, Reports, SnackBarStatus, Customer } from "../../../../constants";
import { HelperService } from "../../../../services/helper.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatTooltip } from "@angular/material/tooltip";
import { isNumber } from "../../../utils";
import { Customer as CustomerType } from "../../../../types";
import { CustomerService } from "../../../../services/customer.service";

@Component({
  selector: 'app-change-installment',
  templateUrl: './change-installment.component.html',
  styleUrls: ['./change-installment.component.scss']
})
export class ChangeInstallmentComponent implements OnInit {

  constructor(
      @Inject(MAT_DIALOG_DATA) private data: { customer: CustomerType },
      private customerService: CustomerService,
      private helperService: HelperService,
      private dialogRef: MatDialogRef<ChangeInstallmentComponent>
  ) {
  }

  @ViewChild('installmentTooltip') installmentTooltip!: MatTooltip;
  @ViewChild('monthCountTooltip') monthCountTooltip!: MatTooltip;

  currentInstallment: string = '';
  currentBalance: string = '';
  remarks: string = '';
  particular: string = 'Installment Changed';
  newInstallment!: string;
  newMonthCount!: string;
  date: Date = new Date();

  INVALID_INSTALLMENT: string = Customer.INVALID_INSTALLMENT_VALUE_MESSAGE_TEXT;
  INVALID_MONTH_COUNT: string = Customer.INVALID_MONTH_COUNT_VALUE_MESSAGE_TEXT;
  CANCEL_BUTTON_TEXT: string = Common.CANCEL_BUTTON_TEXT;
  CHANGE_BUTTON_TEXT: string = ChangeInstallment.CHANGE_BUTTON_TEXT;
  NEW_INSTALLMENT_LABEL: string = ChangeInstallment.NEW_INSTALLMENT_LABEL;
  NEW_MONTH_COUNT_LABEL: string = ChangeInstallment.NEW_MONTH_COUNT_LABEL;
  CURRENT_INSTALLMENT_LABEL: string = ChangeInstallment.CURRENT_INSTALLMENT_LABEL;
  BALANCE_LABEL: string = ChangeInstallment.BALANCE_LABEL;
  CHANGE_INSTALLMENT_TITLE: string = ChangeInstallment.CHANGE_INSTALLMENT_TITLE;
  REMARKS_LABEL: string = MakePayment.REMARKS_LABEL;
  PARTICULARS_LABEL: string = MakePayment.PARTICULARS_LABEL;
  DATE: string = Reports.DATE;

  ngOnInit(): void {
    this.currentInstallment = this.data.customer.MonthRental!.toString();
    this.currentBalance = this.data.customer.Balance!.toString();
  }

  calculateInstallment(): void {
    if (this.isValidNumber(this.newMonthCount)) {
      this.newInstallment = this.calculateNewRental(parseInt(this.newMonthCount)).toFixed(2).toString();
    } else {
      this.monthCountTooltip.disabled = false;
      this.monthCountTooltip.message = this.INVALID_MONTH_COUNT;
      this.monthCountTooltip.show();
    }
  }

  calculateMonthCount(): void {
    if (this.isValidNumber(this.newInstallment)) {
      this.newMonthCount = this.calculateNewRental(parseInt(this.newMonthCount)).toString();
    } else {
      this.installmentTooltip.disabled = false;
      this.installmentTooltip.message = this.INVALID_INSTALLMENT;
      this.installmentTooltip.show();
    }
  }

  isValidNumber(value: string): boolean {
    return (/^[1-9]\d*(\.\d+)?$/.test(value) && (parseInt(value) > 0))
  }

  onClickChange(): void {
    if (this.isValidNumber(this.newInstallment) && this.isValidNumber(this.newMonthCount)) {
      this.customerService.ChangeInstallment(this.data.customer.ID!, parseInt(this.newMonthCount), parseInt(this.newInstallment), this.date).then(result => {
        this.dialogRef.close();
        if (result.status) {
          this.helperService.openSnackBar({text: result.message, status: SnackBarStatus.SUCCESS});
        } else {
          this.helperService.openSnackBar({text: result.message, status: SnackBarStatus.FAILED});
        }
      })
    } else {
      if (!this.isValidNumber(this.newInstallment)) {
        this.installmentTooltip.message = this.INVALID_INSTALLMENT;
        this.installmentTooltip.show();
      }
      if (!this.isValidNumber(this.newMonthCount)) {
        this.monthCountTooltip.message = this.INVALID_MONTH_COUNT;
        this.monthCountTooltip.show();
      }
    }
  }

  calculateNewRental(rentalFactor: number): number {
    let monthsLeft = 12;

    let currentDocFeeRental = this.data.customer.DocumentFee / this.data.customer.MonthCount;
    let remainingDocFee = this.data.customer.DocumentFee - (currentDocFeeRental * monthsLeft);

    let currentCapitalRental = this.data.customer.PaymentEPBalance / this.data.customer.MonthCount;
    let remainingCapital = this.data.customer.PaymentEPBalance - (currentCapitalRental * monthsLeft);

    let remainingPayment = remainingDocFee + remainingCapital;
    console.log(this.data.customer.Installment!);
    let newInterest = remainingPayment * this.data.customer.InterestRate / 100;

    console.log(remainingPayment + newInterest);
    return (remainingPayment + newInterest) / rentalFactor;
  }


  onChangeMonthCount() {
    const isValidMonthCount = isNumber(this.newMonthCount.toString()) && this.newMonthCount != null;
    if (isValidMonthCount) {
      this.monthCountTooltip.disabled = true;
    }
  }

  onChangeMonthRental() {
    const isValidMonthRental = isNumber(this.newInstallment.toString()) && this.newInstallment != null;
    if (isValidMonthRental) {
      this.installmentTooltip.disabled = true;
    }
  }

}
