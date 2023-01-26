import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import jsPDF from "jspdf";
import { Common, MakePayment, Particulars, SnackBarStatus } from "../../../../constants";
import { HelperService } from "../../../../services/helper.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatTooltip } from "@angular/material/tooltip";
import { isNumber } from "../../../utils";
import { CustomerService } from "../../../../services/customer.service";
import { Customer } from "../../../../types";

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent implements OnInit {

  constructor(
      private customerService: CustomerService,
      private helperService: HelperService,
      private dialogRef: MatDialogRef<MakePaymentComponent>,
      @Inject(MAT_DIALOG_DATA) private data: { customer: Customer }
  ) { }

  @ViewChild('amountTooltip') amountTooltip!: MatTooltip;
  @ViewChild('refTooltip') refTooltip!: MatTooltip;

  amount!: string;
  totalPayable!: string;
  installment: string = '';
  arrears: string = '';
  remarks: string = '';
  particulars: string = 'Paid By Cash';
  refNo: string = '';
  chequeNumber: string = '';
  bank: string = '';
  realizeDate: Date = new Date();
  paymentDate: Date = new Date();
  isdPayDisabled: boolean = false;

  INVALID_PAYMENT_AMOUNT = MakePayment.INVALID_PAYMENT_AMOUNT_MESSAGE_TEXT;
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

  paymentData: any = [ ];

  ngOnInit(): void {
    this.totalPayable = (this.data.customer.MonthRental + +this.data.customer.Arrears!.toString()).toString();
    this.arrears = this.data.customer.Arrears!.toString();
    this.installment = this.data.customer.MonthRental.toString();
  }

  onClickPay(): void {
    this.paymentData = [
      ["Date", new Date().toDateString()],
      ["Customer Name", this.data.customer.Name],
      ["Payment", parseFloat(this.amount).toFixed(2) + " LKR"],
      ["Balance", this.data.customer.Balance!.toFixed(2) + " LKR"],
      ["Particulars", this.particulars],
    ];
    if (/^\d+$/.test(this.amount) && (parseInt(this.amount) > 0)){
      this.amountTooltip.message = '';
      if ((/^\d+$/.test(this.refNo) && (parseInt(this.refNo) > 0))|| this.refNo.length === 0){
        this.refTooltip.message = '';
        this.isdPayDisabled = true;
        this.customerService.MakePayment(this.data.customer, this.paymentDate.toISOString(), parseInt(this.amount), parseInt(this.refNo) || 0, this.particulars, this.remarks).then(result => {
          if (result.status) {
            this.helperService.openSnackBar({text:result.message, status: SnackBarStatus.SUCCESS});
            this.exportToPDF();
          } else {
            this.helperService.openSnackBar({text:result.message, status: SnackBarStatus.FAILED});
          }
          this.dialogRef.close();
          this.isdPayDisabled = false;
        })
      }else{
        this.refTooltip.disabled = false;
        this.refTooltip.message = MakePayment.ONLY_NUMBER_ALLOWED_MESSAGE_TEXT;
        this.refTooltip.show();
      }
    }else{
      this.amountTooltip.disabled = false;
      this.amountTooltip.message = this.INVALID_PAYMENT_AMOUNT;
      this.amountTooltip.show();
    }
  }



  onChangeAmount() {
    const isValidAmount = isNumber(this.amount.toString()) && this.amount != null;
    if (isValidAmount) {
      this.amountTooltip.disabled = true;
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
        0: {fontSize: 12},
        1: {fontSize: 12},
        2: {fontSize: 12},
        3: {fontSize: 12},
        4: {fontSize: 12},
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

  onChangeReference() {
    const isValidRef = isNumber(this.refNo.toString());
    if (isValidRef) {
      this.refTooltip.disabled = true;
    }
  }

}
