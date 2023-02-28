import { Component, Inject, OnInit } from '@angular/core';
import { AllCustomers, Letter, NewCustomer, OldCustomer } from "../../../../constants";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Customer as CustomerType } from "../../../../types";
import { CustomerRoutes } from "../../../../route-data";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-view-old-customer',
  templateUrl: './view-old-customer.component.html',
  styleUrls: ['./view-old-customer.component.scss']
})
export class ViewOldCustomerComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<ViewOldCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) private data: CustomerType
  ) {
  }

  customerId!: string;
  customer!: CustomerType;
  isLoading = true;
  selectedTabIndex = 0;
  EP_TITLE = NewCustomer.EpCalculation.EP_TAB_TITLE;
  CUSTOMER_BASIC_TITLE = NewCustomer.BasicDetails.BASIC_CUSTOMER_TAB_TEXT;

  POPUP_TITLE = OldCustomer.VIEW_POPUP_TITLE;

  LEDGER_LABEL = AllCustomers.LEDGER_BUTTON_TEXT;
  OK_BUTTON_TEXT = Letter.OK_BUTTON_TEXT;
  CUSTOMER_MESSAGES = NewCustomer;


  customerForm = this.formBuilder.group({
    project: this.formBuilder.control(this.data.Project),
    id: this.formBuilder.control(this.data.ID),
    name: this.formBuilder.control(this.data.Name),
    address: this.formBuilder.control(this.data.Address),
    nic: this.formBuilder.control(this.data.NIC),
    email: this.formBuilder.control(this.data.Email),
    contactNo: this.formBuilder.control(this.data.PrimaryContactNo),
    saleDate: this.formBuilder.control(this.data.SaleDate),
    bondNo: this.formBuilder.control(this.data.BondNo),
    whatsappNo: this.formBuilder.control(this.data.WhatsAppNo),
    viberNo: this.formBuilder.control(this.data.ViberNo),
    imoNo: this.formBuilder.control(this.data.ImoNo),
    planNo: this.formBuilder.control(this.data.PlanNo),
    deedNo: this.formBuilder.control(this.data.DeedNo),
    note: this.formBuilder.control(this.data.Note),
    locationCoordinates: this.formBuilder.control(this.data.LocationCoordinates),

    blockNo: this.formBuilder.control(this.data.BlockNo),
    perchesValue: this.formBuilder.control(this.data.PerchesVal),
    extent: this.formBuilder.control(this.data.Extent),
    totalBlockValue: this.formBuilder.control(this.data.TotalBlockValue),
    saleValue: this.formBuilder.control(this.data.SaleValue),
    discount: this.formBuilder.control(this.data.Discount),
    marketingSaleValue: this.formBuilder.control(this.data.MarketingSaleValue),
    advancePayment: this.formBuilder.control(this.data.AdvancePayment),
    withoutInterestEpPayment: this.formBuilder.control(this.data.WithoutInterestEpPayment),
    paymentEPBalance: this.formBuilder.control(this.data.PaymentEPBalance),
    documentFee: this.formBuilder.control(this.data.DocumentFee),
    intPlusEPSaleValue: this.formBuilder.control(this.data.IntPlusEPSaleValue),
    totalReceivableBalance: this.formBuilder.control(this.data.TotalReceivableBalance),
    monthCount: this.formBuilder.control(this.data.MonthCount),
    monthRental: this.formBuilder.control(this.data.MonthRental),
    firstRentalDate: this.formBuilder.control(this.data.FirstRentalDate),
    interestRate: this.formBuilder.control(this.data.InterestRate),
    interest: this.formBuilder.control(''),
    dueDate: this.formBuilder.control(this.data.DueDate),
  });

  ngOnInit(): void {
    let firstRentalDateTimestamp = this.data.FirstRentalDate as Timestamp;
    let saleDateTimestamp = this.data.SaleDate as Timestamp;
    let dueDateTimestamp = this.data.DueDate as Timestamp;
    let firstRentalDate = firstRentalDateTimestamp.toDate();
    let saleDate = saleDateTimestamp.toDate();
    let dueDate = dueDateTimestamp.toDate();
    this.customerForm.controls['saleDate'].setValue(saleDate.toLocaleDateString());
    this.customerForm.controls['firstRentalDate'].setValue(firstRentalDate.toLocaleDateString());
    this.customerForm.controls['dueDate'].setValue(dueDate.toLocaleDateString());
  }

  onClickViewLedger() {
    this.router.navigate([CustomerRoutes.Root, CustomerRoutes.Ledger.url], {
      queryParams: {
        id: this.customerId,
        old: true,
        name: this.data.Name
      }
    }).then(() => {
        this.dialogRef.close();
      }
    );
  }

}
