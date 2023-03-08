import { Component, OnInit } from '@angular/core';
import {
  AllCustomers,
  Common,
  Customer,
  ErrorMessages,
  LedgerMessages,
  NewCustomer,
  SnackBarStatus,
  UserMessages
} from "../../../constants";
import { HelperService } from "../../../services/helper.service";
import { ChangeInstallmentComponent } from "../popups/change-installment/change-installment.component";
import { MatDialog } from "@angular/material/dialog";
import { DeleteConfirmPopupComponent } from "../../../delete-confirm-popup/delete-confirm-popup.component";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { ProjectService } from "../../../services/projects.service";
import { SettlementComponent } from "../popups/settlement/settlement.component";
import { Customer as CustomerType, Project } from "../../../types";
import { MakePaymentComponent } from "../popups/make-payment/make-payment.component";
import { CustomerService } from "../../../services/customer.service";
import firebase from "firebase/compat";
import { CustomerRoutes } from "../../../route-data";
import { Location } from "@angular/common";
import { Store } from "@ngrx/store";
import { CustomersState } from "../../store/customers.state";
import { ProjectsState } from "../../../projects/store/projects.state";
import { projectsSelector } from "../../../projects/store/projects.selectors";
import { ProjectActions } from "../../../projects/store/projects.actions";
import { singleCustomerSelector } from "../../store/customers.selectors";
import { CanComponentDeactivate } from "../../../guards/save-data.guard";
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})
export class ViewCustomerComponent implements OnInit, CanComponentDeactivate {

  constructor(
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private helperService: HelperService,
    private projectService: ProjectService,
    private location: Location,
    private customerStore: Store<CustomersState>,
    private projectsStore: Store<ProjectsState>
  ) {
  }

  customerId!: string;
  customer!: CustomerType;
  isLoading: boolean = true;
  selectedTabIndex = 0;

  DELETE_BUTTON_TEXT: string = AllCustomers.DELETE_BUTTON_TEXT;
  LEDGER_LABEL = AllCustomers.LEDGER_BUTTON_TEXT;

  MAKE_PAYMENT_BUTTON_TEXT = LedgerMessages.MAKE_PAYMENT_BUTTON_TEXT;

  SAVE_BUTTON_TEXT: string = Customer.SAVE_BUTTON_TEXT;
  SETTLEMENT_BUTTON_TEXT: string = Customer.SETTLEMENT_BUTTON_TEXT;
  CHANGE_INSTALLMENT_BUTTON_TEXT: string = Customer.CHANGE_INSTALLMENT_BUTTON_TEXT;

  BACK = Common.BACK_BUTTON_TEXT;
  VALIDATION_MESSAGES = ErrorMessages;
  CUSTOMER_MESSAGES = NewCustomer;

  isFormChanged: boolean = false;
  isAdvancedCustomer: boolean = true;
  projects: Project[] = [];

  basicCustomerForm = this.formBuilder.group({
    project: this.formBuilder.control('', [Validators.required]),
    id: this.formBuilder.control('', [Validators.required]),
    name: this.formBuilder.control('', [Validators.required]),
    address: this.formBuilder.control(''),
    email: this.formBuilder.control(''),
    nic: this.formBuilder.control(''),
    contactNo: this.formBuilder.control('', [Validators.required, Validators.pattern(UserMessages.PHONE_NUMBER_REGEX)]),
    secondaryContactNumbers: this.formBuilder.control(''),
    saleDate: this.formBuilder.control(''),
    bondNo: this.formBuilder.control(''),
    whatsappNo: this.formBuilder.control(''),
    viberNo: this.formBuilder.control(''),
    imoNo: this.formBuilder.control(''),
    planNo: this.formBuilder.control(''),
    deedNo: this.formBuilder.control(''),
    note: this.formBuilder.control(''),
    locationCoordinates: this.formBuilder.control(''),
  });

  epForm = this.formBuilder.group({
    blockNo: this.formBuilder.control('', [Validators.required]),
    perchesValue: this.formBuilder.control(['', Validators.required]),
    extent: this.formBuilder.control('', [Validators.required]),
    totalBlockValue: this.formBuilder.control('', [Validators.required]),
    saleValue: this.formBuilder.control('', [Validators.required]),
    discount: this.formBuilder.control(''),
    marketingSaleValue: this.formBuilder.control('', [Validators.required]),
    advancePayment: this.formBuilder.control('', [Validators.required]),
    withoutInterestEpPayment: this.formBuilder.control('', [Validators.required]),
    paymentEPBalance: this.formBuilder.control('', [Validators.required]),
    documentFee: this.formBuilder.control(''),
    intPlusEPSaleValue: this.formBuilder.control('', [Validators.required]),
    totalReceivableBalance: this.formBuilder.control('', [Validators.required]),
    monthCount: this.formBuilder.control('', [Validators.required]),
    monthRental: this.formBuilder.control('', [Validators.required]),
    firstRentalDate: this.formBuilder.control('', [Validators.required]),
    interestRate: this.formBuilder.control('', [Validators.required]),
    dueDate: this.formBuilder.control('', [Validators.required]),
  })

  mapClientObject(): CustomerType {
    return {
      Project: this.basicCustomerForm.value.project || "",
      ID: this.basicCustomerForm.value.id,
      Email: this.basicCustomerForm.value.email || "",
      Name: this.basicCustomerForm.value.name || "",
      Address: this.basicCustomerForm.value.address || "",
      NIC: this.basicCustomerForm.value.nic || "",
      PrimaryContactNo: this.basicCustomerForm.value.contactNo || "",
      SecondaryContactNumbers: this.basicCustomerForm.value.secondaryContactNumbers || "",
      SaleDate: new Date(this.basicCustomerForm.value.saleDate),
      BondNo: this.basicCustomerForm.value.bondNo || "",
      PlanNo: this.basicCustomerForm.value.planNo || "",
      DeedNo: this.basicCustomerForm.value.deedNo || "",
      Note: this.basicCustomerForm.value.note || "",
      WhatsAppNo: this.basicCustomerForm.value.whatsapp || "",
      ViberNo: this.basicCustomerForm.value.viber || "",
      ImoNo: this.basicCustomerForm.value.imo || "",
      BlockNo: this.epForm.value.blockNo || "",
      PerchesVal: this.epForm.value.perchesValue,
      Extent: this.epForm.value.extent,
      TotalBlockValue: this.epForm.value.totalBlockValue,
      SaleValue: +this.epForm.value.saleValue,
      Discount: this.epForm.value.discount,
      MarketingSaleValue: +this.epForm.value.marketingSaleValue,
      AdvancePayment: +this.epForm.value.advancePayment,
      PaymentEPBalance: +this.epForm.value.paymentEpBalance,
      DocumentFee: +this.epForm.value.documentFee,
      InterestRate: +this.epForm.value.interestRate,
      IntPlusEPSaleValue: +this.epForm.value.intPlusEPSaleValue,
      WithoutInterestEpPayment: +this.epForm.value.withoutInterestEpPayment,
      TotalReceivableBalance: +this.epForm.value.totalReceivableBalance,
      MonthCount: +this.epForm.value.monthCount,
      MonthRental: +this.epForm.value.monthRental,
      FirstRentalDate: new Date(this.epForm.value.firstRentalDate),
      DueDate: new Date(this.epForm.value.dueDate),
      Type: this.customer.Type
    };
  }

  ngOnInit() {
    this.projectsStore.dispatch(ProjectActions.get_all());

    this.route.queryParams
      .subscribe(params => {
          this.customerId = params['id'];
          this.projectsStore.select(projectsSelector)
            .subscribe(data => {
              if (data == undefined) {
                this.isLoading = true;
              } else {
                this.projects = data;
                this.customerStore.select(singleCustomerSelector(this.customerId)).subscribe(customerData => {
                  this.customer = customerData!;
                  debugger
                  this.setCustomerDetails();
                  // @ts-ignore
                  let firstRentalDateTimestamp = this.customer.FirstRentalDate as Timestamp;
                  // @ts-ignore
                  let saleDateTimestamp = this.customer.SaleDate as Timestamp;
                  let dueDateTimestamp = this.customer.DueDate as Timestamp;

                  let firstRentalDate = firstRentalDateTimestamp.toDate();
                  let saleDate = saleDateTimestamp.toDate();
                  let dueDate = dueDateTimestamp.toDate();
                  this.epForm.controls['firstRentalDate'].setValue(firstRentalDate.toLocaleDateString());
                  this.basicCustomerForm.controls['saleDate'].setValue(saleDate);
                  this.epForm.controls['dueDate'].setValue(dueDate.toLocaleDateString());
                  this.isLoading = false;

                  this.epForm.valueChanges.subscribe(() => {
                    this.isFormChanged = true;
                  });
                  this.basicCustomerForm.valueChanges.subscribe(() => {
                    this.isFormChanged = true;
                  })
                })
              }
            });
        }
      );
  }

  onClickBack(): void {
    this.location.back();
  }

  setCustomerDetails() {
    this.basicCustomerForm.controls['id'].setValue(this.customer.ID);
    this.basicCustomerForm.controls['project'].setValue(this.customer.Project);
    this.basicCustomerForm.controls['name'].setValue(this.customer.Name);
    this.basicCustomerForm.controls['address'].setValue(this.customer.Address);
    this.basicCustomerForm.controls['nic'].setValue(this.customer.NIC);
    this.basicCustomerForm.controls['contactNo'].setValue(this.customer.PrimaryContactNo);
    this.basicCustomerForm.controls['email'].setValue(this.customer.Email);
    this.basicCustomerForm.controls['bondNo'].setValue(this.customer.BondNo);
    this.basicCustomerForm.controls['planNo'].setValue(this.customer.PlanNo);
    this.basicCustomerForm.controls['locationCoordinates'].setValue(this.customer.LocationCoordinates);
    this.basicCustomerForm.controls['whatsappNo'].setValue(this.customer.WhatsAppNo);
    this.basicCustomerForm.controls['viberNo'].setValue(this.customer.ViberNo);
    this.basicCustomerForm.controls['imoNo'].setValue(this.customer.ImoNo);
    this.basicCustomerForm.controls['deedNo'].setValue(this.customer.DeedNo);
    this.basicCustomerForm.controls['note'].setValue(this.customer.Note);
    this.epForm.controls['blockNo'].setValue(this.customer.BlockNo);
    this.epForm.controls['perchesValue'].setValue(this.customer.PerchesVal);
    this.epForm.controls['extent'].setValue(this.customer.Extent);
    this.epForm.controls['totalBlockValue'].setValue(this.customer.TotalBlockValue);
    this.epForm.controls['saleValue'].setValue(this.customer.SaleValue);
    this.epForm.controls['discount'].setValue(this.customer.Discount);
    this.epForm.controls['marketingSaleValue'].setValue(this.customer.MarketingSaleValue);
    this.epForm.controls['advancePayment'].setValue(this.customer.AdvancePayment);
    this.epForm.controls['withoutInterestEpPayment'].setValue(this.customer.WithoutInterestEpPayment);
    this.epForm.controls['paymentEPBalance'].setValue(this.customer.PaymentEPBalance);
    this.epForm.controls['documentFee'].setValue(this.customer.DocumentFee);
    this.epForm.controls['intPlusEPSaleValue'].setValue(this.customer.IntPlusEPSaleValue);
    this.epForm.controls['totalReceivableBalance'].setValue(this.customer.TotalReceivableBalance);
    this.epForm.controls['monthCount'].setValue(this.customer.MonthCount);
    this.epForm.controls['monthRental'].setValue(this.customer.MonthRental);
    this.epForm.controls['interestRate'].setValue(this.customer.InterestRate);
    this.epForm.controls['dueDate'].setValue(this.customer.DueDate);
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
    if (this.epForm.valid) {
      this.epForm.markAsUntouched();
      if (this.basicCustomerForm.valid) {
        this.basicCustomerForm.markAsUntouched();
        const snackBarRef = this.helperService.openAndGetSnackBar({
          text: Common.SAVING,
          status: SnackBarStatus.INFO
        });
        const client = this.mapClientObject();
        this.customerService.UpdateClient(client).then(result => {
          snackBarRef.dismiss();
          this.isFormChanged = false;
          if (result.status) {
            this.helperService.openSnackBar({ text: result.message, status: SnackBarStatus.SUCCESS });
          } else {
            this.helperService.openSnackBar({ text: result.message, status: SnackBarStatus.FAILED });
          }
        });
      } else {
        this.selectedTabIndex = 0;
        this.basicCustomerForm.markAllAsTouched();
      }
    } else {
      this.selectedTabIndex = 1;
      this.epForm.markAllAsTouched();
    }
  }

  onClickMakePayment(): void {
    const dialogRef = this.matDialog.open(MakePaymentComponent, { width: '600px', data: this.customer });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onClickSettle() {
    const dialogRef = this.matDialog.open(SettlementComponent, { width: '400px', data: { customer: this.customer } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onClickChangeInstallment(): void {
    const dialogRef = this.matDialog.open(ChangeInstallmentComponent, {
      width: '500px',
      data: { customer: this.customer }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getContactNumberErrorMessage(): string {
    if (this.basicCustomerForm.controls['contactNo'].hasError('pattern')) {
      return this.VALIDATION_MESSAGES.TELEPHONE;
    }
    return this.VALIDATION_MESSAGES.required(this.CUSTOMER_MESSAGES.BasicDetails.PHONE_LABEL);
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
          this.onClickBack();
          this.helperService.openSnackBar({
            text: Customer.DELETE_CUSTOMER_TEXT,
            status: SnackBarStatus.SUCCESS
          });
        });
      }
    });
  }

  canDeactivate(): Promise<boolean> | boolean {
    if (this.isFormChanged) {
      return this.helperService.canGoBack().then(result => {
        debugger;
        return result;
      });
    } else {
      return true;
    }
  }

}
