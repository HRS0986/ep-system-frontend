import { Component, Inject, OnInit } from '@angular/core';
import jsPDF from "jspdf";
import { Common, ErrorMessages, MakePayment, Particulars, Settlement, SnackBarStatus } from "../../../../constants";
import { HelperService } from "../../../../services/helper.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CustomerService } from "../../../../services/customer.service";
import { Customer } from "../../../../types";
import 'jspdf-autotable';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent implements OnInit {

  constructor(
    private customerService: CustomerService,
    private helperService: HelperService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<MakePaymentComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Customer
  ) {
  }

  totalPayable!: string;
  installment: string = '';
  arrears: string = '';

  MAKE_PAYMENT_TITLE = MakePayment.MAKE_PAYMENT_TITLE;
  CHEQUE_NUMBER_TEXT = MakePayment.CHEQUE_NUMBER_TEXT;
  BANK = MakePayment.BANK_TEXT;
  REALIZE_DATE = MakePayment.REALIZE_DATE;
  PAYMENT_DATE = MakePayment.PAYMENT_DATE;
  AMOUNT = MakePayment.AMOUNT_LABEL;
  TOTAL_PAYABLE = MakePayment.TOTAL_PAYABLE_LABEL;
  INSTALLMENT = MakePayment.INSTALLMENT_LABEL;
  ARREARS = MakePayment.ARREARS_LABEL;
  PAY = MakePayment.PAY_BUTTON_TEXT;
  PARTICULARS = MakePayment.PARTICULARS_LABEL;
  REMARKS = MakePayment.REMARKS_LABEL;
  REFERENCE_NO = MakePayment.REFERENCE_NO_LABEL;
  CANCEL_BUTTON_TEXT = Common.CANCEL_BUTTON_TEXT;
  ParticularsList = Object['values'](Particulars);
  VALIDATION_MESSAGES = ErrorMessages;

  paymentData: any = [];

  paymentForm = this.formBuilder.group({
    amount: this.formBuilder.control("", [Validators.required, Validators.min(1)]),
    remarks: this.formBuilder.control(''),
    paymentDate: this.formBuilder.control(new Date()),
    particulars: this.formBuilder.control(''),
    refNo: this.formBuilder.control('', [Validators.pattern(Settlement.NUMBERS_REGEX)]),
    chequeNumber: this.formBuilder.control(''),
    bank: this.formBuilder.control(''),
    realizeDate: this.formBuilder.control(new Date())
  });

  ngOnInit(): void {
    debugger;
    this.totalPayable = (this.data.MonthRental + +this.data.Arrears!.toString()).toString();
    this.arrears = this.data.Arrears!.toString();
    this.installment = this.data.MonthRental.toString();
  }

  onClickPay(): void {
    this.paymentData = [
      ["Date", new Date().toDateString()],
      ["Customer Name", this.data.Name],
      ["Payment", parseFloat(this.paymentForm.value.amount).toFixed(2) + " LKR"],
      ["Balance", this.data.Balance!.toFixed(2) + " LKR"],
      ["Particulars", this.paymentForm.value.particulars],
    ];
    if (this.paymentForm.valid) {
      this.customerService.MakePayment(
        this.data,
        this.paymentForm.value.paymentDate.toISOString(),
        parseInt(this.paymentForm.value.amount),
        parseInt(this.paymentForm.value.refNo) || 0,
        this.paymentForm.value.particulars,
        this.paymentForm.value.remarks
      ).then(result => {
        if (result.status) {
          this.helperService.openSnackBar({ text: result.message, status: SnackBarStatus.SUCCESS });
          this.exportToPDF();
        } else {
          this.helperService.openSnackBar({ text: result.message, status: SnackBarStatus.FAILED });
        }
        this.dialogRef.close();
      })
    }
  }

  exportToPDF() {
    let pdf = new jsPDF("l", "pt", "a5");

    pdf.setFontSize(22);
    pdf.text('Payment Receipt', 210, 55);
    pdf.setFontSize(12);
    pdf.text(Common.BILL_COMPANY_TITLE, 225, 75);
    pdf.setTextColor(99);

    (pdf as any).autoTable({
      startY: 105,
      margin: {
        top: 40,
        left: 160,
        right: 40,
        bottom: 40
      },
      showFoot: 'never',
      showHead: 'never',
      styles: {
        halign: 'left',
        valign: 'top'
      },
      columnStyles: {
        0: { fontSize: 12 },
        1: { fontSize: 12 },
        2: { fontSize: 12 },
        3: { fontSize: 12 },
        4: { fontSize: 12 },
      },
      body: this.paymentData,
      theme: 'plain',
      didDrawCell: (data: any) => {
        console.log(data.column.index)
      }
    });

    // Open PDF document in browser's new tab
    pdf.output('dataurlnewwindow')
  }

  getAmountErrorMessage() {
    if (this.paymentForm.controls['amount'].hasError('required')) {
      return this.VALIDATION_MESSAGES.required(this.AMOUNT);
    }
    return this.VALIDATION_MESSAGES.min(1);
  }

}
