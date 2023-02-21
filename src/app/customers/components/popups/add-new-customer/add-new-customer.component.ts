import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  Common,
  CustomerTypes,
  ErrorMessages,
  NewCustomer,
  SnackBarStatus,
  UserManagementMessages,
  UserMessages
} from "../../../../constants";
import { FormBuilder, Validators } from "@angular/forms";
import { HelperService } from "../../../../services/helper.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Customer, Project } from "../../../../types";
import { MatDatepickerInput } from "@angular/material/datepicker";
import { AuthService } from "../../../../services/auth.service";
import { CustomerService } from "../../../../services/customer.service";
import { Store } from "@ngrx/store";
import { ProjectsState } from "../../../../projects/store/projects.state";
import { ProjectActions } from "../../../../projects/store/projects.actions";
import { projectsSelector } from "../../../../projects/store/projects.selectors";
import { CustomValidators } from "../../../../helpers/custom-validators";

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
  ) {
  }

  @ViewChild('pickerFirstRental') pickerFirstRental!: MatDatepickerInput<Date>;

  // TODO: Check all date field error messages in html file

  EMAIL_LABEL = UserManagementMessages.EMAIL_LABEL;
  COMMON_MESSAGES = Common;
  NEXT_BUTTON_TEXT = NewCustomer.NEXT_BUTTON_TEXT;
  PREVIOUS_BUTTON_TEXT = NewCustomer.PREVIOUS_BUTTON_TEXT;
  VALIDATION_MESSAGES = ErrorMessages;
  CUSTOMER_MESSAGES = NewCustomer;

  selectedTabIndex = 0;
  showErrorMessage = false;
  projects: Project[] = [];
  isAdvancedCustomer = false;

  basicCustomerForm = this.formBuilder.group({
    project: this.formBuilder.control('', [Validators.required]),
    id: this.formBuilder.control('', [Validators.required]),
    name: this.formBuilder.control('', [Validators.required]),
    email: this.formBuilder.control('', [Validators.email]),
    address: this.formBuilder.control(''),
    nic: this.formBuilder.control(''),
    contactNo: this.formBuilder.control('', [Validators.required, Validators.pattern(UserMessages.PHONE_NUMBER_REGEX)]),
    secondaryContactNumbers: this.formBuilder.control(''),
    saleDate: this.formBuilder.control('', [Validators.required]),
    bondNo: this.formBuilder.control(''),
    planNo: this.formBuilder.control(''),
    deedNo: this.formBuilder.control(''),
    note: this.formBuilder.control(''),
    whatsapp: this.formBuilder.control('', [Validators.pattern(UserMessages.PHONE_NUMBER_REGEX)]),
    viber: this.formBuilder.control('', [Validators.pattern(UserMessages.PHONE_NUMBER_REGEX)]),
    imo: this.formBuilder.control('', [Validators.pattern(UserMessages.PHONE_NUMBER_REGEX)]),
    locationCoordinates: this.formBuilder.control(''),
  });

  epForm = this.formBuilder.group({
    blockNo: this.formBuilder.control('', [Validators.required]),
    perchesValue: this.formBuilder.control('', [Validators.required]),
    extent: this.formBuilder.control('', [Validators.required]),
    totalBlockValue: this.formBuilder.control('', [Validators.required]),
    saleValue: this.formBuilder.control('', [Validators.required, Validators.min(1)]),
    discount: this.formBuilder.control(''),
    marketingSaleValue: this.formBuilder.control('', [Validators.required, Validators.min(1)]),
    advancePayment: this.formBuilder.control('', [Validators.required]),
    withoutInterestEpPayment: this.formBuilder.control(''),
    paymentEpBalance: this.formBuilder.control('', [Validators.required, Validators.min(1)]),
    documentFee: this.formBuilder.control(''),
    intPlusEPSaleValue: this.formBuilder.control('', [CustomValidators.conditionalRequired(this.isAdvancedCustomer)]),
    totalReceivableBalance: this.formBuilder.control('', [Validators.required, Validators.min(1)]),
    monthCount: this.formBuilder.control('', [Validators.required, Validators.min(1), Validators.max(this.isAdvancedCustomer ? 24 : 10000)]),
    monthRental: this.formBuilder.control('', [Validators.required]),
    firstRentalDate: this.formBuilder.control('', [Validators.required, CustomValidators.minEqualDate(this.basicCustomerForm.controls['saleDate'])]),
    interestRate: this.formBuilder.control('', [CustomValidators.conditionalRequired(this.isAdvancedCustomer)]),
    dueDate: this.formBuilder.control(''),
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
        if (isClientExist) {
          this.basicCustomerForm.get('id')!.setErrors({ valid: false });
        }
      });
    });
  }

  onChangeDuration(event: any) {
    const monthCount = this.epForm.controls['monthCount'].value;
    const firstDate = new Date(this.epForm.controls['firstRentalDate'].value);
    if (event.target.value != null) {
      firstDate.setMonth(firstDate.getMonth() + +monthCount);
      if (firstDate.getDate() != firstDate.getDate()) firstDate.setDate(0);
      this.epForm.controls['dueDate'].setValue(firstDate.toLocaleDateString());
    }
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
    const isValidRate = this.epForm.controls['interestRate'].valid;
    const isValidEpBalance = this.epForm.controls['paymentEpBalance'].valid;
    const isValidMonthCount = this.epForm.controls['monthCount'].valid;

    if (isValidRate && isValidEpBalance && isValidMonthCount) {
      let rate = this.epForm.value.interestRate;
      if (this.isAdvancedCustomer) rate = 1;
      const intPlusEpSale = rate * this.epForm.value.paymentEpBalance * 0.01 * this.epForm.value.monthCount / 12;
      this.epForm.controls['intPlusEPSaleValue'].setValue(parseFloat(intPlusEpSale.toString()).toFixed(2));
    } else {
      this.epForm.markAsUntouched();
      this.epForm.controls['interestRate'].markAsTouched();
      this.epForm.controls['paymentEpBalance'].markAsTouched();
      this.epForm.controls['monthCount'].markAsTouched();
    }
  }

  setTotalBlockValue(_: any) {
    const perchesValue = this.epForm.value.perchesValue;
    let extent = this.epForm.value.extent;

    if (perchesValue > 0 && extent > 0) {
      this.epForm.controls['totalBlockValue'].setValue((+perchesValue * +extent).toString());
      this.epForm.controls['saleValue'].setValue((+perchesValue * +extent).toString());
    }
  }

  calculateMarketingSaleValue() {
    if (this.epForm.controls['saleValue'].valid) {
      this.epForm.controls['marketingSaleValue'].setValue((+this.epForm.value.saleValue - +this.epForm.value.discount).toString());
    } else {
      this.epForm.markAsUntouched();
      this.epForm.controls['saleValue'].markAsTouched();
    }
  }

  calculateTotalReceivableBalance(): void {
    const isValidEpBalance = this.epForm.controls['paymentEpBalance'].valid;
    const isValidEpInterest = this.epForm.controls['intPlusEPSaleValue'].valid;

    if (isValidEpBalance && isValidEpInterest) {
      const val = parseFloat((+this.epForm.value.paymentEpBalance + +this.epForm.value.documentFee + +this.epForm.value.intPlusEPSaleValue).toString()).toFixed(2);
      this.epForm.controls['totalReceivableBalance'].setValue(val);
    } else {
      this.epForm.markAsUntouched();
      this.epForm.controls['paymentEpBalance'].markAllAsTouched();
      this.epForm.controls['intPlusEPSaleValue'].markAllAsTouched();
    }
  }

  calculateMonthlyRental(): void {
    const isValidMonthCount = this.epForm.controls['monthCount'].valid;
    const isValidTotalReceivableBalance = this.epForm.controls['totalReceivableBalance'].valid;

    if (isValidMonthCount && isValidTotalReceivableBalance) {
      this.epForm.controls['monthRental'].setValue(parseFloat((+this.epForm.value.totalReceivableBalance / +this.epForm.value.monthCount).toString()).toFixed(2));
    } else {
      this.epForm.markAsUntouched();
      this.epForm.controls['monthCount'].markAsTouched();
      this.epForm.controls['totalReceivableBalance'].markAsTouched();
    }
  }

  calculatePaymentEpBalance(): void {
    const isValidMarketingSaleValue = this.epForm.controls['marketingSaleValue'].valid;
    const isValidAdvance = this.epForm.controls['advancePayment'].valid;

    if (isValidMarketingSaleValue && isValidAdvance) {
      this.epForm.controls['paymentEpBalance'].setValue((+this.epForm.value.marketingSaleValue - +this.epForm.value.advancePayment).toFixed(2));
    } else {
      this.epForm.markAsUntouched();
      this.epForm.controls['advancePayment'].markAsTouched();
      this.epForm.controls['marketingSaleValue'].markAsTouched();
    }
  }

  getMarketingSaleValueErrorMessage(): string {
    if (this.epForm.controls['marketingSaleValue'].hasError('min')) {
      return ErrorMessages.min(0);
    }
    return ErrorMessages.required(this.CUSTOMER_MESSAGES.EpCalculation.MARKETING_SALE_VALUE_LABEL);
  }

  getTotalReceivableBalanceErrorMessage(): string {
    if (this.epForm.controls['totalReceivableBalance'].hasError('min')) {
      return ErrorMessages.min(0);
    }
    return ErrorMessages.required(this.CUSTOMER_MESSAGES.EpCalculation.TOTAL_RECEIVABLE_BALANCE_LABEL);
  }

  getPaymentEpBalanceErrorMessage(): string {
    if (this.epForm.controls['paymentEpBalance'].hasError('min')) {
      return ErrorMessages.min(0);
    }
    return ErrorMessages.required(this.CUSTOMER_MESSAGES.EpCalculation.PAYMENT_BALANCE_LABEL);
  }

  getSaleValueErrorMessage(): string {
    if (this.epForm.controls['saleValue'].hasError('min')) {
      return ErrorMessages.min(0);
    }
    return ErrorMessages.required(this.CUSTOMER_MESSAGES.EpCalculation.SALE_VALUE_LABEL);
  }

  getContactNumberErrorMessage(): string {
    if (this.basicCustomerForm.controls['contactNo'].hasError('pattern')) {
      return ErrorMessages.TELEPHONE;
    }
    return ErrorMessages.required(this.CUSTOMER_MESSAGES.BasicDetails.PHONE_LABEL);
  }

  getMonthCountErrorMessage(): string {
    if (this.epForm.controls['monthCount'].hasError('min')) {
      return ErrorMessages.min(0);
    } else if (this.epForm.controls['monthCount'].hasError('max')) {
      // TODO: This 24 value should be in a configuration
      return ErrorMessages.max(24);
    }
    return ErrorMessages.required(this.CUSTOMER_MESSAGES.EpCalculation.NUMBER_OF_MONTH_LABEL);
  }

  ngOnSubmit() {
    if (this.basicCustomerForm.valid) {
      if (this.epForm.valid) {
        const client: Customer = this.mapClientObject();
        this.customerService.IsClientExists(client.ID).then(isClientExist => {
          if (!isClientExist) {
            this.customerService.CreateClient(client).then(
              () => {
                this.dialogRef.close();
                this.helperService.openSnackBar({
                  text: NewCustomer.SUCCESS_CREATE_CUSTOMER_MESSAGE_TEXT,
                  status: SnackBarStatus.SUCCESS
                });
              },
              (error) => {
                console.log(error);
                this.helperService.openSnackBar({
                  text: NewCustomer.ERROR_CREATE_CUSTOMER_MESSAGE_TEXT,
                  status: SnackBarStatus.FAILED
                });
              }
            );
          }
        });
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
}
