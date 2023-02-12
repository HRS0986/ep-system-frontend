import { Component, Inject, OnInit } from '@angular/core';
import {
  ChangeInstallment,
  Common,
  Customer,
  MakePayment,
  Reports,
  Settlement,
  SnackBarStatus
} from "../../../../constants";
import { HelperService } from "../../../../services/helper.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Customer as CustomerType } from "../../../../types";
import { CustomerService } from "../../../../services/customer.service";
import { FormBuilder, Validators } from "@angular/forms";

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
    private dialogRef: MatDialogRef<ChangeInstallmentComponent>,
    private formBuilder: FormBuilder
  ) {
  }

  currentInstallment: string = '';
  currentBalance: string = '';

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

  installmentForm = this.formBuilder.group({
    newInstallment: this.formBuilder.control('', [Validators.required, Validators.pattern(Settlement.NUMBERS_REGEX)]),
    newMonthCount: this.formBuilder.control('', [Validators.required, Validators.pattern(Settlement.NUMBERS_REGEX)]),
    remarks: this.formBuilder.control('',),
    particular: this.formBuilder.control(''),
    date: this.formBuilder.control(new Date())
  });

  ngOnInit(): void {
    this.currentInstallment = this.data.customer.MonthRental!.toString();
    this.currentBalance = this.data.customer.Balance!.toString();
  }

  calculateInstallment(): void {
    if (this.isValidNumber(this.installmentForm.value.newMonthCount)) {
      this.installmentForm.value.newInstallment = this.calculateNewRental(parseInt(this.installmentForm.value.newMonthCount)).toFixed(2).toString();
    }
  }

  calculateMonthCount(): void {
    if (this.isValidNumber(this.installmentForm.value.newInstallment)) {
      debugger
      this.installmentForm.value.newMonthCount = this.calculateNewRental(parseInt(this.installmentForm.value.newInstallment)).toString();
    }
  }

  isValidNumber(value: string): boolean {
    return (/^[1-9]\d*(\.\d+)?$/.test(value) && (parseInt(value) > 0))
  }

  onClickChange(): void {
    if (this.installmentForm.valid) {
      this.customerService.ChangeInstallment(
        this.data.customer.ID!,
        parseInt(this.installmentForm.value.newMonthCount),
        parseInt(this.installmentForm.value.newInstallment),
        this.installmentForm.value.date
      ).then(result => {
        this.dialogRef.close();
        if (result.status) {
          this.helperService.openSnackBar({ text: result.message, status: SnackBarStatus.SUCCESS });
        } else {
          this.helperService.openSnackBar({ text: result.message, status: SnackBarStatus.FAILED });
        }
      });
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

  getMonthCountErrors(): string {
    if (this.installmentForm.controls['newMonthCount'].hasError('pattern')) {
      return Customer.INVALID_MONTH_COUNT_VALUE_MESSAGE_TEXT;
    }
    return ChangeInstallment.INSTALLMENT_IS_REQUIRED;
  }

  getRentalErrorMessage() {
    if (this.installmentForm.controls['newInstallment'].hasError('pattern')) {
      return MakePayment.ONLY_NUMBER_ALLOWED_MESSAGE_TEXT;
    }
    return ChangeInstallment.INSTALLMENT_IS_REQUIRED;
  }

}
