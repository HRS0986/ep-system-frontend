import { SnackBarStatus, AlertTypes, CustomerTypes, Roles } from "./constants";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

export interface User {
  UID?: string;
  Email?: string;
  EmailVerified?: boolean;
  FirstName?: string;
  LastName?: string;
  PhotoURL?: string;
  IsActive?: boolean;
  Disabled?: boolean;
  IsFirstLogin?: boolean;
  PhoneNumber?: string;
  CreatedAt?: Date;
  LastSignInAt?: string;
  Role?: Roles;
}

export interface Client {
  ID: string;
  Project: string;
  Email?: string;
  Name: string;
  Address: string;
  NIC: string;
  ContactNo: string;
  WhatsAppNo?: string;
  ViberNo?: string;
  ImoNo?: string;
  SaleDate: Timestamp | Date;
  BondNo: string;
  PlanNo: string;
  DeedNo: string;
  Note: string;
  LocationCoordinates?: string;

  Arrears?: number;
  Balance?: number;
  Installment?: number;

  CurrentRentalAmount?: number;
  CurrentPayedAmount?: number;

  CurrentCapitalPayedAmount?: number;
  CurrentInterestPayedAmount?: number;

  BlockNo: string;
  PerchesVal: number;
  Extent: string;
  TotalBlockValue: string;
  SaleValue: number;
  Discount: string;
  MarketingSaleValue: number;
  AdvancePayment: number;
  WithoutInterestEpPayment: number;
  PaymentEPBalance: number;
  DocumentFee: number;
  IntPlusEPSaleValue: number;
  TotalReceivableBalance: number;
  MonthCount: number;
  MonthRental: number;
  FirstRentalDate: Timestamp | Date;
  InterestRate: number;
  DueDate: Timestamp | Date;
  IsSettled?: boolean;
  IsActive?: boolean;
  CreatedBy?: string;
  Ledger?: Ledger[];
  Type: CustomerTypes;
}

export interface Ledger {
  ID?: string;
  Date: Date | Timestamp;
  RefNo: number;
  InstallmentNo: number;
  Particulars: string;
  Amount: number;
  Arrears: number;
  Balance: number;
  Remarks: string;
  CreatedBy?: string;
  IsActive?: boolean;
}

export interface FnResponse<T = any> {
  status: boolean;
  message: string;
  data: T;
}

export interface Alert {
  ID: string;
  Date: Timestamp;
  IsActive: boolean,
  Seen: boolean,
  Note: string;
  Type: AlertTypes;
  Data: any;
}

export interface Report {
  ClientID: string;
  Name: string;
  Project: string;
  BlockNo: number
  Rental: number;
  Arrears: number;
  Payment: number;
  Balance: number;
}

export interface RouteObject {
  [key: string]: { url: string, title: string };
}

export interface CustomerReport {
  No: string,
  DateOfSale: Date | Timestamp,
  Project: string,
  BlockNo: string,
  CardNo: string,
  CustomerName: string,
  Address: string,
  IDNumber: string,
  ContactNo: string,
  Note: string
}

export interface CashReport {
  Date: Date | Timestamp;
  BillNo: string;
  LotNo: string;
  Project: string;
  Sale: string;
  EP: string;
  Advance: string;
  FullPayment: string;
  DeedAndPlan: string;
}

export interface EPReport {
  Project: string;
  BlockNo: string;
  RentalDate: Date | Timestamp;
  NumberOfMonth: number;
  EPValue: number;
  Capital: number;
  Interest: number;
  DocumentCharge: number;
}

export interface ArrearsReport {
  Project: string;
  BlockNo: string;
  Arrears_3_31: number;
  MonthlyRental: number;
  TotalArrears: number;
  ArrearsRate: number;
  Days30: number;
  Days60: number;
  Days90: number;
  Days90More: number;
  Name: string;
  ContactNo: string;
}

export interface Project {
  ID: string;
  PurchasingDate: Date | Timestamp;
  PurchasingPrice: number;
  Extend: string;
  Address: string;
  LandName: string;
  ProjectName: string;
  PreviousOwner: string;
  PresentOwner: string;
  DeedNo: string;
  Remarks?: string;
  IsActive: boolean;
}

export interface SnackBarConfig {
  text: string;
  status: SnackBarStatus;
  duration?: number;
  positionX?: MatSnackBarHorizontalPosition;
  positionY?: MatSnackBarVerticalPosition;
  action?: string;
}

export interface DeleteConfig {
  title: string;
  body: string;
  entityName: string
}
