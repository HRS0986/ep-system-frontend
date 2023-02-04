import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  Common,
  CustomerTypes,
  NewCustomer,
  SnackBarStatus,
  UserManagement,
  UserMessages
} from "../../../../constants";
import { FormBuilder, Validators } from "@angular/forms";
import { HelperService } from "../../../../services/helper.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Customer, Project } from "../../../../types";
import { MatTooltip } from "@angular/material/tooltip";
import { isNumber } from "../../../utils";
import { MatDatepickerInput } from "@angular/material/datepicker";
import { AuthService } from "../../../../services/auth.service";
import { CustomerService } from "../../../../services/customer.service";
import { Store } from "@ngrx/store";
import { ProjectsState } from "../../../../projects/store/projects.state";
import { ProjectActions } from "../../../../projects/store/projects.actions";
import { projectsSelector } from "../../../../projects/store/projects.selectors";

@Component({
  selector: 'app-add-new-customer',
  templateUrl: './add-new-customer.component.html',
  styleUrls: ['./add-new-customer.component.scss']
})
export class AddNewCustomerComponent implements OnInit {

  constructor(
      private formBuilder: FormBuilder,
      private dialogRef: MatDialogRef<AddNewCustomerComponent>,
      private customerService: CustomerService,
      private helperService: HelperService,
      private auth: AuthService,
      @Inject(MAT_DIALOG_DATA) private data: { customerType: CustomerTypes },
      private store: Store<ProjectsState>
  ) { }

  @ViewChild('interestRateTooltip') interestRateTooltip!: MatTooltip;
  @ViewChild('epBalanceTooltip') epBalanceTooltip!: MatTooltip;
  @ViewChild('docChargeTooltip') docChargeTooltip!: MatTooltip;
  @ViewChild('epInterestTooltip') epInterestTooltip!: MatTooltip;
  @ViewChild('monthRentalTooltip') monthRentalTooltip!: MatTooltip;
  @ViewChild('monthCountTooltip') monthCountTooltip!: MatTooltip;
  @ViewChild('marketingSaleValueTooltip') marketingSaleValueTooltip!: MatTooltip;
  @ViewChild('saleValueTooltip') saleValueTooltip!: MatTooltip;
  @ViewChild('advanceTooltip') advanceTooltip!: MatTooltip;
  @ViewChild('discountTooltip') discountTooltip!: MatTooltip;
  @ViewChild('totalReceivableBalanceTooltip') totalReceivableBalanceTooltip!: MatTooltip;
  @ViewChild('pickerFirstRental') pickerFirstRental!: MatDatepickerInput<Date>;

  EP_TAB_TITLE = NewCustomer.EpCalculation.EP_TAB_TITLE;
  CUSTOMER_TAB_TITLE = NewCustomer.BasicDetails.BASIC_CUSTOMER_TAB_TEXT;
  REQUIRED_FIELD_ERROR_TEXT = Common.REQUIRED_FIELD_MESSAGE_TEXT;
  INVALID_RATE = NewCustomer.EpCalculation.INVALID_RATE_MESSAGE_TEXT;
  INVALID_EP = NewCustomer.EpCalculation.INVALID_EP_MESSAGE_TEXT;
  INVALID_EP_INTEREST = NewCustomer.EpCalculation.INVALID_EP_INTEREST;
  INVALID_TOTAL_RECEIVABLE_BALANCE = NewCustomer.EpCalculation.INVALID_TOTAL_RECEIVABLE_BALANCE;
  INVALID_MONTH_COUNT = NewCustomer.EpCalculation.INVALID_MONTH_COUNT;
  INVALID_MARKETING_SALE_VALUE = NewCustomer.EpCalculation.INVALID_MARKETING_SALE_VALUE;
  INVALID_SALE_VALUE = NewCustomer.EpCalculation.INVALID_SALE_VALUE;
  INVALID_ADVANCE = NewCustomer.EpCalculation.INVALID_ADVANCE;
  INVALID_DISCOUNT = NewCustomer.EpCalculation.INVALID_DISCOUNT;
  NAME_LABEL = NewCustomer.BasicDetails.NAME_LABEL;
  EMAIL_LABEL = UserManagement.EMAIL_LABEL;
  ADDRESS_LABEL = NewCustomer.BasicDetails.ADDRESS_LABEL;
  PHONE_LABEL = NewCustomer.BasicDetails.PHONE_LABEL;
  PROJECT_LABEL = NewCustomer.BasicDetails.PROJECT_LABEL;
  NIC_LABEL = NewCustomer.BasicDetails.NIC_LABEL;
  BOND_NUMBER_LABEL = NewCustomer.BasicDetails.BOND_NUMBER_LABEL;
  PLAN_NUMBER_LABEL = NewCustomer.BasicDetails.PLAN_NUMBER_LABEL;
  DEED_NUMBER_LABEL = NewCustomer.BasicDetails.DEED_NUMBER_LABEL;
  NOTE_LABEL = NewCustomer.BasicDetails.NOTE_LABEL;
  SECONDARY_CONTACT_LABEL = NewCustomer.BasicDetails.SECONDARY_CONTACT_LABEL;
  NEXT_BUTTON_TEXT = NewCustomer.NEXT_BUTTON_TEXT;
  PREVIOUS_BUTTON_TEXT = NewCustomer.PREVIOUS_BUTTON_TEXT;
  ID_LABEL = NewCustomer.BasicDetails.ID_LABEL;
  DATE_OF_SALE_LABEL = NewCustomer.BasicDetails.DATE_OF_SALE_LABEL;
  CANCEL_BUTTON_TEXT = Common.CANCEL_BUTTON_TEXT;
  SAVE_BUTTON_TEXT = Common.SAVE_BUTTON_TEXT;
  BLOCK_NUMBER_LABEL = NewCustomer.EpCalculation.BLOCK_NUMBER_LABEL;
  PAYMENT_EP_BALANCE_LABEL = NewCustomer.EpCalculation.PAYMENT_EP_BALANCE_LABEL;
  PAYMENT_BALANCE_LABEL = NewCustomer.EpCalculation.PAYMENT_BALANCE_LABEL;
  PERCHES_VALUE_LABEL = NewCustomer.EpCalculation.PERCHES_VALUE_LABEL;
  INTEREST_RATE_LABEL = NewCustomer.EpCalculation.INTEREST_RATE_LABEL;
  EXTENT_LABEL = NewCustomer.EpCalculation.EXTENT_LABEL;
  WHATSAPP = NewCustomer.BasicDetails.WHATSAPP;
  VIBER = NewCustomer.BasicDetails.VIBER;
  IMO = NewCustomer.BasicDetails.IMO;
  TOTAL_BLOCK_VALUE_LABEL = NewCustomer.EpCalculation.TOTAL_BLOCK_VALUE_LABEL;
  WITHOUT_INTEREST_LABEL = NewCustomer.EpCalculation.WITHOUT_INTEREST_LABEL;
  SALE_VALUE_LABEL = NewCustomer.EpCalculation.SALE_VALUE_LABEL;
  TOTAL_RECEIVABLE_BALANCE_LABEL = NewCustomer.EpCalculation.TOTAL_RECEIVABLE_BALANCE_LABEL;
  DISCOUNT_LABEL = NewCustomer.EpCalculation.DISCOUNT_LABEL;
  FIRST_RENTAL_DATE_LABEL = NewCustomer.EpCalculation.FIRST_RENTAL_DATE_LABEL;
  DOCUMENT_FEE_LABEL = NewCustomer.EpCalculation.DOCUMENT_FEE_LABEL;
  INT_PLUS_EP_SALE_VALUE_LABEL = NewCustomer.EpCalculation.INT_PLUS_EP_SALE_VALUE_LABEL;
  DUE_DATE_LABEL = NewCustomer.EpCalculation.DUE_DATE_LABEL;
  NUMBER_OF_MONTH_LABEL = NewCustomer.EpCalculation.NUMBER_OF_MONTH_LABEL;
  ADVANCE_PAYMENT_LABEL = NewCustomer.EpCalculation.ADVANCE_PAYMENT_LABEL;
  MARKETING_SALE_VALUE_LABEL = NewCustomer.EpCalculation.MARKETING_SALE_VALUE_LABEL;
  MONTHLY_RENTAL_AMOUNT_LABEL = NewCustomer.EpCalculation.MONTHLY_RENTAL_AMOUNT_LABEL;
  LOCATION_LABEL = NewCustomer.BasicDetails.LOCATION_COORDINATES;

  selectedTabIndex = 0;
  showErrorMessage = false;
  isSmallDate = false;
  projects: Project[] = [];
  isAdvancedCustomer = false;

  epForm = this.formBuilder.group({
    blockNo: ['', Validators.required],
    perchesValue: ['', Validators.required],
    extent: ['', Validators.required],
    totalBlockValue: ['', Validators.required],
    saleValue: ['', Validators.required],
    discount: [0],
    marketingSaleValue: ['', Validators.required],
    advancePayment: [0, Validators.required],
    withoutInterestEpPayment: [''],
    paymentEpBalance: [0, Validators.required],
    documentFee: [0],
    intPlusEPSaleValue: [0, Validators.required],
    totalReceivableBalance: [0, Validators.required],
    monthCount: ['', Validators.required,],
    monthRental: ['', Validators.required],
    firstRentalDate: ['', Validators.required],
    interestRate: [''],
    dueDate: [''],
  });

  basicCustomerForm = this.formBuilder.group({
    project: ['', Validators.required],
    id: ['', Validators.required],
    name: ['', Validators.required],
    email: [''],
    address: [''],
    nic: [''],
    contactNo: ['', Validators.required, Validators.pattern(UserMessages.PHONE_NUMBER_REGEX)],
    secondaryContactNumbers: [''],
    saleDate: ['', Validators.required],
    bondNo: [''],
    planNo: [''],
    deedNo: [''],
    note: [''],
    whatsapp: [''],
    viber: [''],
    imo: [''],
    locationCoordinates: [''],
  });

  ngOnInit(): void {
    this.store.dispatch(ProjectActions.get_all())
    this.epForm.controls['firstRentalDate'].setValue(new Date());
    this.isAdvancedCustomer = this.data.customerType == CustomerTypes.ADVANCED_CUSTOMER;
    this.store.select(projectsSelector).subscribe(data => {
      this.projects = data!;
    });
  }

  onChangeId(event: any) {
    this.basicCustomerForm.controls['id'].valueChanges.subscribe(_ => {
      this.customerService.IsClientExists(event.target.value).then(isClientExist => {
        console.log(isClientExist);
        if (isClientExist) {
          this.basicCustomerForm.get('id')!.setErrors({valid: false});
        }
      });
    });
  }

  onChangeDuration(event: any) {
    const monthCount = this.epForm.controls['monthCount'].value;
    const isValidMonthCount = isNumber(this.epForm.controls['monthCount'].value) && this.epForm.controls['monthCount'].value != null;
    if (isValidMonthCount) {
      this.monthCountTooltip.disabled = true;
    }
    const firstDate = new Date(this.epForm.controls['firstRentalDate'].value);
    if (event.target.value == null) {
      this.basicCustomerForm.controls['firstRentalDate'].setErrors({valid: false});
    } else {
      firstDate.setMonth(firstDate.getMonth() + +monthCount);
      if (firstDate.getDate() != firstDate.getDate()) {
        firstDate.setDate(0);
      }
      this.epForm.controls['dueDate'].setValue(firstDate.toLocaleDateString());
    }
  }

  onSaleDateChange(event: any) {
    if (event.target.value == null) {
      this.basicCustomerForm.controls['saleDate'].setErrors({valid: false});
    }
  }

  isValidRate(){
    if (this.isAdvancedCustomer) return true;
    else return this.epForm.controls['interestRate'].value != null;
  }

  onClickPrevious(): void {
    this.selectedTabIndex--;
    this.showErrorMessage = false;
  }

  onClickNext(): void {
    if (this.epForm.valid) {
      this.selectedTabIndex++;
      this.showErrorMessage = false;
    } else {
      console.log(this.epForm);
      this.epForm.markAllAsTouched();
      this.showErrorMessage = true;
    }
  }

  mapClientObject(): Customer {
    return {
      CurrentPayedAmount: 0, CurrentRentalAmount: 0,
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
      InterestRate: this.isAdvancedCustomer ? 0 : +this.epForm.value.interestRate,
      IntPlusEPSaleValue: +this.epForm.value.intPlusEPSaleValue,
      WithoutInterestEpPayment: +this.epForm.value.withoutInterestEpPayment,
      TotalReceivableBalance: +this.epForm.value.totalReceivableBalance,
      MonthCount: +this.epForm.value.monthCount,
      MonthRental: +this.epForm.value.monthRental,
      FirstRentalDate: new Date(this.epForm.value.firstRentalDate),
      DueDate: new Date(this.epForm.value.dueDate),

      IsSettled: false,
      IsActive: true,
      CreatedBy: this.auth.userData?.uid as string,
      Type: this.data.customerType
    };
  }

  calculateInterest(): void {
    const isValidRate = this.isAdvancedCustomer || this.epForm.value.interestRate != 0 && this.epForm.value.interestRate != null;
    const isValidEpBalance = this.epForm.value.paymentEpBalance != 0 && this.epForm.value.paymentEpBalance != null;
    const isValidMonthCount = this.epForm.value.monthCount != 0 && this.epForm.value.monthCount != null;
    if (isValidRate && isValidEpBalance && isValidMonthCount) {
      this.interestRateTooltip.message = '';
      this.epBalanceTooltip.message = '';
      this.monthCountTooltip.message = '';
      let rate = this.epForm.value.interestRate;
      if (this.isAdvancedCustomer) rate = 1;
      const intPlusEpSale = rate * this.epForm.value.paymentEpBalance * 0.01 * this.epForm.value.monthCount / 12;
      this.epForm.controls['intPlusEPSaleValue'].setValue(parseFloat(intPlusEpSale.toString()).toFixed(2));
    } else {
      if (!isValidRate) {
        this.interestRateTooltip.disabled = false;
        this.epForm.controls['interestRate'].markAsTouched();
        this.interestRateTooltip.message = this.INVALID_RATE;
        this.interestRateTooltip.show()
      }
      if (!isValidEpBalance) {
        this.epBalanceTooltip.disabled = false;
        this.epForm.controls['paymentEpBalance'].markAsTouched();
        this.epBalanceTooltip.message = this.INVALID_EP;
        this.epBalanceTooltip.show();
      }
      if (!isValidMonthCount) {
        this.monthCountTooltip.disabled = false;
        this.epForm.controls['monthCount'].markAsTouched();
        this.monthCountTooltip.message = this.INVALID_MONTH_COUNT;
        this.monthCountTooltip.show();
      }
    }
  }

  setTotalBlockValue(_: any) {
    const p = this.epForm.value.perchesValue;
    let e = this.epForm.value.extent;
    e = isNumber(e[e.length - 1]) ? e : e.slice(0, e.length - 1);
    if (p > 0 && e > 0 && isNumber(p.toString())) {
      this.epForm.controls['totalBlockValue'].setValue((p * e).toString());
      this.epForm.controls['saleValue'].setValue((p * e).toString());
    }
  }

  calculateMarketingSaleValue() {
    const isValidSaleValue = this.epForm.value.saleValue != 0 && this.epForm.value.saleValue != null;
    const isValidDiscount = isNumber(this.epForm.value.discount.toString())

    if (isValidSaleValue && isValidDiscount && isNumber(this.epForm.value.saleValue.toString())) {
      this.epForm.controls['marketingSaleValue'].setValue((+this.epForm.value.saleValue - +this.epForm.value.discount).toString());
    } else {
      if (!isValidSaleValue) {
        this.saleValueTooltip.disabled = false;
        this.epForm.controls['saleValue'].markAsTouched();
        this.saleValueTooltip.message = this.INVALID_SALE_VALUE;
        this.saleValueTooltip.show();
      }
      if (!isValidDiscount) {
        this.discountTooltip.disabled = false;
        this.epForm.controls['discount'].markAsTouched();
        this.epForm.controls['discount'].setErrors({'invalid': true});
        this.discountTooltip.message = this.INVALID_DISCOUNT;
        this.discountTooltip.show();
      }
    }
  }

  calculateTotalReceivableBalance(): void {
    const isValidEpBalance = this.epForm.value.paymentEpBalance != 0 && this.epForm.value.paymentEpBalance != null;
    const isValidEpInterest = this.isAdvancedCustomer || (this.epForm.value.intPlusEPSaleValue != 0 && this.epForm.value.intPlusEPSaleValue != null);

    if (isValidEpBalance && isValidEpInterest && isNumber(this.epForm.value.paymentEpBalance!.toString()) && isNumber(this.epForm.value.intPlusEPSaleValue.toString())) {
      const val = parseFloat((+this.epForm.value.paymentEpBalance + +this.epForm.value.documentFee + +this.epForm.value.intPlusEPSaleValue).toString()).toFixed(2);
      this.epForm.controls['totalReceivableBalance'].setValue(val);
    } else {
      if (!isValidEpBalance) {
        this.epBalanceTooltip.disabled = false;
        this.epForm.controls['paymentEpBalance'].markAsTouched();
        this.epBalanceTooltip.message = this.INVALID_EP;
        this.epBalanceTooltip.show();
      }
      if (!this.isAdvancedCustomer && !isValidEpInterest) {
        this.epInterestTooltip.disabled = false;
        this.epForm.controls['intPlusEPSaleValue'].markAsTouched();
        this.epInterestTooltip.message = this.INVALID_EP_INTEREST;
        this.epInterestTooltip.show();
      }
    }
  }

  calculateMonthlyRental(): void {
    const isValidMonthCount = this.epForm.value.monthCount != 0 && this.epForm.value.monthCount != null;
    const isValidTotalReceivableBalance = this.epForm.value.totalReceivableBalance != 0 && this.epForm.value.totalReceivableBalance != null;
    if (isValidMonthCount && isValidTotalReceivableBalance && isNumber(this.epForm.value.monthCount!.toString()) && isNumber(this.epForm.value.totalReceivableBalance.toString())) {
      this.epForm.controls['monthRental'].setValue(parseFloat((+this.epForm.value.totalReceivableBalance / +this.epForm.value.monthCount).toString()).toFixed(2));
    } else {
      if (!isValidMonthCount) {
        this.monthCountTooltip.disabled = false;
        this.epForm.controls['monthCount'].markAsTouched();
        this.monthCountTooltip.message = this.INVALID_MONTH_COUNT;
        this.monthCountTooltip.show();
      }
      if (!isValidTotalReceivableBalance) {
        this.totalReceivableBalanceTooltip.disabled = false;
        this.epForm.controls['totalReceivableBalance'].markAsTouched();
        this.totalReceivableBalanceTooltip.message = this.INVALID_TOTAL_RECEIVABLE_BALANCE;
        this.totalReceivableBalanceTooltip.show();
      }
    }
  }

  calculatePaymentEpBalance(): void {
    const isValidMarketingSaleValue = this.epForm.value.marketingSaleValue != 0 && this.epForm.value.marketingSaleValue != null;
    const isValidAdvance = isNumber(this.epForm.value.advancePayment.toString()) && this.epForm.value.advancePayment != null;

    if (isValidMarketingSaleValue && isValidAdvance && isNumber(this.epForm.value.marketingSaleValue.toString())) {
      this.epForm.controls['paymentEpBalance'].setValue((+this.epForm.value.marketingSaleValue - +this.epForm.value.advancePayment).toFixed(2));
    } else {
      if (!isValidMarketingSaleValue) {
        this.marketingSaleValueTooltip.disabled = false;
        this.epForm.controls['marketingSaleValue'].markAsTouched();
        this.marketingSaleValueTooltip.message = this.INVALID_MARKETING_SALE_VALUE;
        this.marketingSaleValueTooltip.show();
      }
      if (!isValidAdvance) {
        this.advanceTooltip.disabled = false;
        this.epForm.controls['advancePayment'].markAsTouched();
        this.advanceTooltip.message = this.INVALID_ADVANCE;
        this.advanceTooltip.show();
      }
    }
  }

  onAdvancedPaymentChange() {
    const isValidAdvance = isNumber(this.epForm.value.advancePayment.toString()) && this.epForm.value.advancePayment != null;
    if (isValidAdvance) {
      this.advanceTooltip.disabled = true;
    }
  }

  onMarketingSaleValueChange() {
    const isValidMarketingSaleValue = isNumber(this.epForm.value.marketingSaleValue.toString()) && this.epForm.value.marketingSaleValue != null;
    if (isValidMarketingSaleValue) {
      this.marketingSaleValueTooltip.disabled = true;
    }
  }

  onSaleValueChange() {
    const isValidSaleValue = isNumber(this.epForm.value.saleValue.toString()) && this.epForm.value.saleValue != null;
    if (isValidSaleValue) {
      this.saleValueTooltip.disabled = true;
    }
  }

  onDiscountChange() {
    const isValidDiscount = isNumber(this.epForm.value.discount.toString()) && this.epForm.value.discount != null;
    if (isValidDiscount) {
      this.discountTooltip.disabled = true;
    }
  }

  onPaymentEpBalanceChange() {
    const isValidPaymentEpBalance = isNumber(this.epForm.value.paymentEpBalance.toString()) && this.epForm.value.paymentEpBalance != null;
    if (isValidPaymentEpBalance) {
      this.epBalanceTooltip.disabled = true;
    }
  }

  onInterestRateChange() {
    const isValidInterestRate = isNumber(this.epForm.value.interestRate.toString()) && this.epForm.value.interestRate != null;
    if (isValidInterestRate) {
      this.interestRateTooltip.disabled = true;
    }
  }

  onIntPlusSaleValueChange() {
    const isValidIntPlusSaleValue = isNumber(this.epForm.value.intPlusEPSaleValue.toString()) && this.epForm.value.intPlusEPSaleValue != null;
    if (isValidIntPlusSaleValue) {
      this.epInterestTooltip.disabled = true;
    }
  }

  onTotalReceivableBalanceChange() {
    const isValidTotalReceivableBalanceChange = isNumber(this.epForm.value.totalReceivableBalance.toString()) && this.epForm.value.totalReceivableBalance != null;
    if (isValidTotalReceivableBalanceChange) {
      this.totalReceivableBalanceTooltip.disabled = true;
    }
  }

  ngOnSubmit() {
    if (this.basicCustomerForm.valid) {
      if (this.epForm.valid && this.isValidRate()) {
        if (this.epForm.value.firstRentalDate < this.basicCustomerForm.value.saleDate) {
          this.pickerFirstRental.min = this.epForm.value.saleDate;
          this.epForm.controls['firstRentalDate'].markAsTouched();
          this.isSmallDate = true;
          this.selectedTabIndex = 0;
          this.epForm.controls['firstRentalDate'].setErrors({invalid: true});
        } else {
          this.isSmallDate = false;
          const client: Customer = this.mapClientObject();
          this.customerService.IsClientExists(client.ID).then(isClientExist => {
            if (!isClientExist) {
              this.customerService.CreateClient(client).then(
                  () => {
                    this.dialogRef.close();
                    this.helperService.openSnackBar({
                      text: NewCustomer.SUCCESS_CREATE_CUSTOMER_MESSAGE_TEXT,
                      status: SnackBarStatus.SUCCESS});
                  },
                  (error) => {
                    console.log(error);
                    this.helperService.openSnackBar({
                      text: NewCustomer.ERROR_CREATE_CUSTOMER_MESSAGE_TEXT,
                      status: SnackBarStatus.FAILED});
                  }
              );
            }
          });
        }
      } else {
        this.selectedTabIndex = 0;
        this.showErrorMessage = true;
        this.epForm.markAllAsTouched();
      }
    } else {
      this.basicCustomerForm.markAllAsTouched();
      this.showErrorMessage = true;
    }
  }

  onMonthCountChange() {
    const isValidMonthCount = isNumber(this.epForm.value.monthCount.toString()) && this.epForm.value.monthCount != null;
    if (isValidMonthCount) {
      this.monthCountTooltip.disabled = true;
    }
  }

}
