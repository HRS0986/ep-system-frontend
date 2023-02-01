import { Component, OnInit } from '@angular/core';
import {
  AllCustomers,
  Common,
  Customer,
  LedgerMessages,
  NewCustomer,
  SnackBarStatus,
  UserManagement
} from "../../../constants";
import { HelperService } from "../../../services/helper.service";
import { ChangeInstallmentComponent } from "../popups/change-installment/change-installment.component";
import { firstValueFrom, Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { DeleteConfirmPopupComponent } from "../../../delete-confirm-popup/delete-confirm-popup.component";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { ProjectService } from "../../../services/projects.service";
import { SettlementComponent } from "../popups/settlement/settlement.component";
import { Project, Customer as CustomerType } from "../../../types";
import { MakePaymentComponent } from "../popups/make-payment/make-payment.component";
import { CustomerService } from "../../../services/customer.service";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;
import { CustomerRoutes } from "../../../route-data";
import { Location } from "@angular/common";

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})
export class ViewCustomerComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private helperService: HelperService,
    private projectService: ProjectService,
    private location: Location
  ) {
  }

  formChangedCount = 0;
  customerId!: string;
  customer!: CustomerType;
  isLoading: boolean = true;

  subscriptions: Subscription[] = [];

  MAKE_PAYMENT_BUTTON_TEXT = LedgerMessages.MAKE_PAYMENT_BUTTON_TEXT;
  SAVE_BUTTON_TEXT: string = Customer.SAVE_BUTTON_TEXT;
  DELETE_BUTTON_TEXT: string = AllCustomers.DELETE_BUTTON_TEXT;
  CHANGE_INSTALLMENT_BUTTON_TEXT: string = Customer.CHANGE_INSTALLMENT_BUTTON_TEXT;
  SETTLEMENT_BUTTON_TEXT: string = Customer.SETTLEMENT_BUTTON_TEXT;
  NAME_LABEL = NewCustomer.BasicDetails.NAME_LABEL;
  ADDRESS_LABEL = NewCustomer.BasicDetails.ADDRESS_LABEL;
  PHONE_LABEL = NewCustomer.BasicDetails.PHONE_LABEL;
  PROJECT_LABEL = NewCustomer.BasicDetails.PROJECT_LABEL;
  NIC_LABEL = NewCustomer.BasicDetails.NIC_LABEL;
  BOND_NUMBER_LABEL = NewCustomer.BasicDetails.BOND_NUMBER_LABEL;
  PLAN_NUMBER_LABEL = NewCustomer.BasicDetails.PLAN_NUMBER_LABEL;
  DEED_NUMBER_LABEL = NewCustomer.BasicDetails.DEED_NUMBER_LABEL;
  NOTE_LABEL = NewCustomer.BasicDetails.NOTE_LABEL;
  EMAIL_LABEL = UserManagement.EMAIL_LABEL;
  ID_LABEL = NewCustomer.BasicDetails.ID_LABEL;
  DATE_OF_SALE_LABEL = NewCustomer.BasicDetails.DATE_OF_SALE_LABEL;
  BLOCK_NUMBER_LABEL = NewCustomer.EpCalculation.BLOCK_NUMBER_LABEL;
  PAYMENT_EP_BALANCE_LABEL = NewCustomer.EpCalculation.PAYMENT_EP_BALANCE_LABEL;
  PERCHES_VALUE_LABEL = NewCustomer.EpCalculation.PERCHES_VALUE_LABEL;
  INTEREST_RATE_LABEL = NewCustomer.EpCalculation.INTEREST_RATE_LABEL;
  EXTENT_LABEL = NewCustomer.EpCalculation.EXTENT_LABEL;
  TOTAL_BLOCK_VALUE_LABEL = NewCustomer.EpCalculation.TOTAL_BLOCK_VALUE_LABEL;
  WITHOUT_INTEREST_LABEL = NewCustomer.EpCalculation.WITHOUT_INTEREST_LABEL;
  SALE_VALUE_LABEL = NewCustomer.EpCalculation.SALE_VALUE_LABEL;
  TOTAL_RECEIVABLE_BALANCE_LABEL = NewCustomer.EpCalculation.TOTAL_RECEIVABLE_BALANCE_LABEL;
  DISCOUNT_LABEL = NewCustomer.EpCalculation.DISCOUNT_LABEL;
  FIRST_RENTAL_DATE_LABEL = NewCustomer.EpCalculation.FIRST_RENTAL_DATE_LABEL;
  WHATSAPP_NUMBER_LABEL = NewCustomer.BasicDetails.WHATSAPP;
  VIBER_NUMBER_LABEL = NewCustomer.BasicDetails.VIBER;
  IMO_NUMBER_LABEL = NewCustomer.BasicDetails.IMO;
  DOCUMENT_FEE_LABEL = NewCustomer.EpCalculation.DOCUMENT_FEE_LABEL;
  INT_PLUS_EP_SALE_VALUE_LABEL = NewCustomer.EpCalculation.INT_PLUS_EP_SALE_VALUE_LABEL;
  DUE_DATE_LABEL = NewCustomer.EpCalculation.DUE_DATE_LABEL;
  NUMBER_OF_MONTH_LABEL = NewCustomer.EpCalculation.NUMBER_OF_MONTH_LABEL;
  ADVANCE_PAYMENT_LABEL = NewCustomer.EpCalculation.ADVANCE_PAYMENT_LABEL;
  MARKETING_SALE_VALUE_LABEL = NewCustomer.EpCalculation.MARKETING_SALE_VALUE_LABEL;
  MONTHLY_RENTAL_AMOUNT_LABEL = NewCustomer.EpCalculation.MONTHLY_RENTAL_AMOUNT_LABEL;
  LEDGER_LABEL = AllCustomers.LEDGER_BUTTON_TEXT;
  LOCATION = NewCustomer.BasicDetails.LOCATION_COORDINATES;
  BACK = Customer.BACK;

  isFormChanged: boolean = false;
  isAdvancedCustomer: boolean = true;
  EDITABLE_FIELDS_COUNT: number = 35;
  projects: Project[] = [];


  customerForm = this.formBuilder.group({
    project: ['', Validators.required],
    id: ['', Validators.required],
    name: ['', Validators.required],
    address: [''],
    email: [''],
    nic: [''],
    contactNo: ['', Validators.required],
    saleDate: [''],
    bondNo: [''],
    whatsappNo: [''],
    viberNo: [''],
    imoNo: [''],
    planNo: [''],
    deedNo: [''],
    note: [''],
    locationCoordinates: [''],

    blockNo: ['', Validators.required],
    perchesValue: ['', Validators.required],
    extent: ['', Validators.required],
    totalBlockValue: ['', Validators.required],
    saleValue: ['', Validators.required],
    discount: [''],
    marketingSaleValue: ['', Validators.required],
    advancePayment: ['', Validators.required],
    withoutInterestEpPayment: ['', Validators.required],
    paymentEPBalance: ['', Validators.required],
    documentFee: [''],
    intPlusEPSaleValue: ['', Validators.required],
    totalReceivableBalance: ['', Validators.required],
    monthCount: ['', Validators.required],
    monthRental: ['', Validators.required],
    firstRentalDate: ['', Validators.required],
    interestRate: ['', Validators.required],
    dueDate: ['', Validators.required],
  });

  mapClientObject(): CustomerType {
    return {
      Project: this.customerForm.value.project || "",
      ID: this.customerForm.value.id,
      Email: this.customerForm.value.email || "",
      Name: this.customerForm.value.name || "",
      Address: this.customerForm.value.address || "",
      NIC: this.customerForm.value.nic || "",
      PrimaryContactNo: this.customerForm.value.contactNo || "",
      SecondaryContactNumbers: this.customerForm.value.secondaryContactNumbers || "",
      SaleDate: new Date(this.customerForm.value.saleDate),
      BondNo: this.customerForm.value.bondNo || "",
      PlanNo: this.customerForm.value.planNo || "",
      DeedNo: this.customerForm.value.deedNo || "",
      Note: this.customerForm.value.note || "",
      WhatsAppNo: this.customerForm.value.whatsapp || "",
      ViberNo: this.customerForm.value.viber || "",
      ImoNo: this.customerForm.value.imo || "",
      BlockNo: this.customerForm.value.blockNo || "",
      PerchesVal: this.customerForm.value.perchesValue,
      Extent: this.customerForm.value.extent,
      TotalBlockValue: this.customerForm.value.totalBlockValue,
      SaleValue: +this.customerForm.value.saleValue,
      Discount: this.customerForm.value.discount,
      MarketingSaleValue: +this.customerForm.value.marketingSaleValue,
      AdvancePayment: +this.customerForm.value.advancePayment,
      PaymentEPBalance: +this.customerForm.value.paymentEpBalance,
      DocumentFee: +this.customerForm.value.documentFee,
      InterestRate: +this.customerForm.value.interestRate,
      IntPlusEPSaleValue: +this.customerForm.value.intPlusEPSaleValue,
      WithoutInterestEpPayment: +this.customerForm.value.withoutInterestEpPayment,
      TotalReceivableBalance: +this.customerForm.value.totalReceivableBalance,
      MonthCount: +this.customerForm.value.monthCount,
      MonthRental: +this.customerForm.value.monthRental,
      FirstRentalDate: new Date(this.customerForm.value.firstRentalDate),
      DueDate: new Date(this.customerForm.value.dueDate),
      Type: this.customer.Type
    };
  }

  ngOnInit() {
    const querySubscription = this.route.queryParams
      .subscribe(params => {
          this.customerId = params['id'];
        }
      );

    const formSubscription = this.customerForm.valueChanges.subscribe(() => {
      this.formChangedCount++;
      // NOTE: The form has 34 input fields. In page load, all fields are refilled with user data
      if (this.formChangedCount > this.EDITABLE_FIELDS_COUNT) {
        // NOTE: If any change is made in the form, the Save button will be enabled
        this.isFormChanged = true;
      }
    });

    firstValueFrom(this.customerService.GetAClient(this.customerId)).then(client => {
      this.customer = client as CustomerType;
      this.setCustomerDetails();
      // @ts-ignore
      let firstRentalDateTimestamp = this.customer.FirstRentalDate as Timestamp;
      // @ts-ignore
      let saleDateTimestamp = this.customer.SaleDate as Timestamp;
      let dueDateTimestamp = this.customer.DueDate as Timestamp;

      let firstRentalDate = firstRentalDateTimestamp.toDate();
      let saleDate = saleDateTimestamp.toDate();
      let dueDate = dueDateTimestamp.toDate();
      console.log(saleDate.toLocaleDateString(), dueDate.toLocaleDateString())
      this.customerForm.controls['firstRentalDate'].setValue(firstRentalDate.toLocaleDateString());
      this.customerForm.controls['saleDate'].setValue(saleDate);
      this.customerForm.controls['dueDate'].setValue(dueDate.toLocaleDateString());
      this.isLoading = false;
    });

    this.projectService.GetAllProjects().subscribe(data => {
      this.projects = data;
    });

    this.subscriptions.push(querySubscription);
    this.subscriptions.push(formSubscription);
  }
  onClickBack(): void {
    this.location.back();
  }

  setCustomerDetails() {
    this.customerForm.controls['id'].setValue(this.customer.ID);
    this.customerForm.controls['project'].setValue(this.customer.Project);
    this.customerForm.controls['name'].setValue(this.customer.Name);
    this.customerForm.controls['address'].setValue(this.customer.Address);
    this.customerForm.controls['nic'].setValue(this.customer.NIC);
    this.customerForm.controls['contactNo'].setValue(this.customer.PrimaryContactNo);
    this.customerForm.controls['email'].setValue(this.customer.Email);
    this.customerForm.controls['bondNo'].setValue(this.customer.BondNo);
    this.customerForm.controls['planNo'].setValue(this.customer.PlanNo);
    this.customerForm.controls['locationCoordinates'].setValue(this.customer.LocationCoordinates);
    this.customerForm.controls['whatsappNo'].setValue(this.customer.WhatsAppNo);
    this.customerForm.controls['viberNo'].setValue(this.customer.ViberNo);
    this.customerForm.controls['imoNo'].setValue(this.customer.ImoNo);
    this.customerForm.controls['deedNo'].setValue(this.customer.DeedNo);
    this.customerForm.controls['note'].setValue(this.customer.Note);
    this.customerForm.controls['blockNo'].setValue(this.customer.BlockNo);
    this.customerForm.controls['perchesValue'].setValue(this.customer.PerchesVal);
    this.customerForm.controls['extent'].setValue(this.customer.Extent);
    this.customerForm.controls['totalBlockValue'].setValue(this.customer.TotalBlockValue);
    this.customerForm.controls['saleValue'].setValue(this.customer.SaleValue);
    this.customerForm.controls['discount'].setValue(this.customer.Discount);
    this.customerForm.controls['marketingSaleValue'].setValue(this.customer.MarketingSaleValue);
    this.customerForm.controls['advancePayment'].setValue(this.customer.AdvancePayment);
    this.customerForm.controls['withoutInterestEpPayment'].setValue(this.customer.WithoutInterestEpPayment);
    this.customerForm.controls['paymentEPBalance'].setValue(this.customer.PaymentEPBalance);
    this.customerForm.controls['documentFee'].setValue(this.customer.DocumentFee);
    this.customerForm.controls['intPlusEPSaleValue'].setValue(this.customer.IntPlusEPSaleValue);
    this.customerForm.controls['totalReceivableBalance'].setValue(this.customer.TotalReceivableBalance);
    this.customerForm.controls['monthCount'].setValue(this.customer.MonthCount);
    this.customerForm.controls['monthRental'].setValue(this.customer.MonthRental);
    this.customerForm.controls['interestRate'].setValue(this.customer.InterestRate);
    this.customerForm.controls['dueDate'].setValue(this.customer.DueDate);
  }

  onClickViewLedger() {
    this.router.navigate([CustomerRoutes.Root, CustomerRoutes.Ledger.url], {
      queryParams: {
        id: this.customerId,
        name: this.customer.Name
      }
    }).then();
  }

  ngOnClickSave() {
    const snackBarRef = this.helperService.openAndGetSnackBar({
      text: Common.SAVING,
      status: SnackBarStatus.INFO
    });
    const client = this.mapClientObject();
    this.customerService.UpdateClient(client).then(result => {
      snackBarRef.dismiss();
      this.isFormChanged = false;
      if (result.status) {
        this.helperService.openSnackBar({text: result.message, status: SnackBarStatus.SUCCESS});
      } else {
        this.helperService.openSnackBar({text: result.message, status: SnackBarStatus.FAILED});
      }
    });
  }

  onClickMakePayment(): void {
    const dialogRef = this.matDialog.open(MakePaymentComponent, {width: '600px', data: this.customer});

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

  onClickChangeInstallment(): void {
    const dialogRef = this.matDialog.open(ChangeInstallmentComponent, {
      width: '500px',
      data: {customer: this.customer}
    });

    const subscription = dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    this.subscriptions.push(subscription);
  }

  onClickDelete() {
    const dialogRef = this.matDialog.open(DeleteConfirmPopupComponent, {
      width: '350px',
      data: {
        title: Customer.DELETE_CUSTOMER_TITLE,
        body: Customer.DELETE_CUSTOMER_MESSAGE,
        entityName: this.customer.Name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.customerService.DeleteClient(this.customer.ID).then(() => {
          this.helperService.openSnackBar({
            text: Customer.DELETE_CUSTOMER_TEXT,
            status: SnackBarStatus.SUCCESS
          });
        });
      }
    });
  }

}
