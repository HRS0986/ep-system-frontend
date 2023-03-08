export enum LoginStatus {
  LOGGED_IN,
  LOGGED_OUT,
}

export enum SnackBarStatus {
  SUCCESS = "success-snack-bar",
  FAILED = "error-snack-bar",
  INFO = "info-snack-bar"
}

export enum Roles {
  ADMIN,
  USER,
}

export enum CustomerTypes {
  ADVANCED_CUSTOMER,
  EP_CUSTOMER
}

export enum NotificationTypes {
  SUCCESS,
  ARREARS,
  ALL
}

export enum TagTypes {
  CUSTOMER
}

export class Common {
  public static readonly COPYRIGHT_TEXT = '© 2022 Fusion8. All Rights Reserved.';
  public static readonly COMPANY_NAME = 'Mihil Property';
  public static readonly BILL_COMPANY_TITLE = 'Mihil Property (Pvt) Ltd';
  public static readonly SAVE_BUTTON_TEXT = 'Save';
  public static readonly CANCEL_BUTTON_TEXT = 'Cancel';
  public static readonly CLOSE_BUTTON_TEXT = 'Close';
  public static readonly BACK_BUTTON_TEXT = 'Back';
  public static readonly ACTION_COLUMN_TEXT = 'Action';
  public static readonly SEARCH_LABEL = 'Search';
  public static readonly NO_SEARCH_RESULT_TEXT = 'No search result found';
  public static readonly REQUIRED_FIELD_MESSAGE_TEXT = 'Please fill out all required fields.';
  public static readonly SAVING = 'Saving... Please wait';
  public static readonly PAGE_NOT_FOUND = 'Page Not Found';
  public static readonly EDIT = 'Edit';
  public static readonly DELETE_BUTTON_TEXT = 'Delete';
  public static readonly WARNING_TITLE = 'Warning';
  public static readonly YES_BUTTON_TEXT = 'Yes';
  public static readonly NO_BUTTON_TEXT = 'No';

}

export class AuthMessages {
  public static readonly LOGIN_TOKEN = 'brLoginToken';
  public static readonly LOGIN_BUTTON_TEXT = 'Login';
  public static readonly LOGIN_TITLE = 'Login';
  public static readonly PASSWORD_LABEL = 'Password';
  public static readonly EMAIL_LABEl = 'Email';
  public static readonly WRONG_CREDENTIALS_MESSAGE_TEXT = 'Incorrect email or password.';
  public static readonly WRONG_PASSWORD_MESSAGE_TEXT = 'Incorrect old password.';
  public static readonly SIGN_UP_TITLE = 'Setup Your Account';
  public static readonly CURRENT_PASSWORD_LABEL = 'Current Password';
  public static readonly FIRST_NAME_LABEL = 'First Name';
  public static readonly LAST_NAME_LABEL = 'Last Name';
  public static readonly NEW_PASSWORD_LABEL = 'New Password';
  public static readonly CONFIRM_PASSWORD_LABEL = 'Confirm Password';
  public static readonly SIGN_UP_BUTTON_TEXT = 'Sign Up';
  public static readonly STRONG_PASSWORD_REGEX = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}'
  public static readonly CHANGE_PASSWORD_TITLE = 'Change Password';
  public static readonly SIGNUP_FIRST_STEP_TITLE = 'Name & Contact';
  public static readonly SIGNUP_SECOND_STEP_TITLE = 'Set Password';
}

export class Letter {
  public static readonly OK_BUTTON_TEXT = "Ok";
  public static readonly REMINDER_POPUP_TITLE = "Reminder Letter Details";
  public static readonly AUTO_FILL_ADDRESS = "Auto Fill Address In Letter";
}

export class Customer {
  public static readonly SAVE_BUTTON_TEXT = 'Save Details';
  public static readonly SETTLEMENT_BUTTON_TEXT = 'Settle Payment';
  public static readonly CHANGE_INSTALLMENT_BUTTON_TEXT = 'Change Installment';
  public static readonly DELETE_CUSTOMER_TEXT = 'Customer Deleted Successfully';
  public static readonly DELETE_CUSTOMER_TITLE = 'Delete Customer';
  public static readonly DELETE_CUSTOMER_MESSAGE = 'Are you sure you want to delete this customer?';
  public static readonly CUSTOMER_TYPE = 'Customer Type';
}

export class UserMessages {
  public static readonly BASIC_DETAILS_TAB_TEXT = 'Basic Details';
  public static readonly CHANGE_PASSWORD_TAB_TEXT = 'Change Password';
  public static readonly PHONE_NUMBER_REGEX = '^[0-9]{10}$';
  public static readonly FIRST_NAME_LABEL = 'First Name';
  public static readonly LAST_NAME_LABEL = 'Last Name';
  public static readonly PHONE_NUMBER_LABEL = 'Phone Number';
  public static readonly EDIT_USER_PROFILE_TITLE = "Edit User Profile"
}

export class NewCustomer {
  public static readonly SUCCESS_CREATE_CUSTOMER_MESSAGE_TEXT = 'Customer created successfully.';
  public static readonly ERROR_CREATE_CUSTOMER_MESSAGE_TEXT = 'Error creating customer.';
  public static readonly NEXT_BUTTON_TEXT = 'Next';
  public static readonly PREVIOUS_BUTTON_TEXT = 'Previous';

  public static readonly BasicDetails = class BasicDetails {
    public static readonly BASIC_CUSTOMER_TAB_TEXT = 'Customer Details';
    public static readonly SECONDARY_CONTACT_LABEL = 'Secondary Contact Numbers';
    public static readonly NAME_LABEL = 'Customer Name';
    public static readonly EMAIL_LABEL = 'Email';
    public static readonly ADDRESS_LABEL = 'Address';
    public static readonly PHONE_LABEL = 'Phone Number';
    public static readonly PROJECT_LABEL = 'Project';
    public static readonly DATE_OF_SALE_LABEL = 'Date of Sale';
    public static readonly NIC_LABEL = 'NIC';
    public static readonly BOND_NUMBER_LABEL = 'Bond Number';
    public static readonly PLAN_NUMBER_LABEL = 'Plan Number';
    public static readonly DEED_NUMBER_LABEL = 'Deed Number';
    public static readonly NOTE_LABEL = 'Note';
    public static readonly ID_LABEL = 'ID';
    public static readonly WHATSAPP = 'WhatsApp';
    public static readonly VIBER = 'Viber';
    public static readonly IMO = 'Imo';
    public static readonly LOCATION_COORDINATES = 'Location Coordinates';
  }

  public static readonly EpCalculation = class EpCalculation {
    public static readonly EP_TAB_TITLE = 'EP Calculation';
    public static readonly BLOCK_NUMBER_LABEL = 'Block Number';
    public static readonly PAYMENT_EP_BALANCE_LABEL = 'Payment EP Balance';
    public static readonly PAYMENT_BALANCE_LABEL = 'Payment Balance';
    public static readonly PERCHES_VALUE_LABEL = 'Perches Value';
    public static readonly INTEREST_RATE_LABEL = 'Annual Interest Rate';
    public static readonly EXTENT_LABEL = 'Extent';
    public static readonly TOTAL_BLOCK_VALUE_LABEL = 'Total Block Value';
    public static readonly WITHOUT_INTEREST_LABEL = 'Without Interest E/P Payment';
    public static readonly SALE_VALUE_LABEL = 'Sale Value';
    public static readonly TOTAL_RECEIVABLE_BALANCE_LABEL = 'Total Receivable Balance';
    public static readonly DISCOUNT_LABEL = 'Discount';
    public static readonly FIRST_RENTAL_DATE_LABEL = 'First Rental Date';
    public static readonly DOCUMENT_FEE_LABEL = 'Document Fee';
    public static readonly INT_PLUS_EP_SALE_VALUE_LABEL = 'Int+E/P Sale Value';
    public static readonly DUE_DATE_LABEL = 'Due Date';
    public static readonly NUMBER_OF_MONTH_LABEL = 'Number of Month';
    public static readonly ADVANCE_PAYMENT_LABEL = 'Advance Payment';
    public static readonly MARKETING_SALE_VALUE_LABEL = 'Marketing Sale Value';
    public static readonly MONTHLY_RENTAL_AMOUNT_LABEL = 'Monthly Rental Amount';
  }
}

export class AllCustomers {
  public static readonly ADD_CUSTOMER_BUTTON_TEXT = 'Add New Customer';
    public static readonly ID_COLUMN_TEXT = 'ID';
  public static readonly NAME_COLUMN_TEXT = 'Name';
  public static readonly PROJECT_COLUMN_TEXT = 'Project';
  public static readonly BALANCE_COLUMN_TEXT = 'Balance';
  public static readonly ARREARS_COLUMN_TEXT = 'Arrears';
  public static readonly PAYMENT_EP_BALANCE = 'Payment EP Balance';
  public static readonly VIEW_BUTTON_TEXT = 'View';
  public static readonly DELETE_BUTTON_TEXT = 'Delete';
  public static readonly LEDGER_BUTTON_TEXT = 'Ledger';
  public static readonly SETTLE_PAYMENT_BUTTON_TEXT = 'Settle Payment';
  public static readonly CHANGE_INSTALLMENT_BUTTON_TEXT = 'Change Installment';
}

export class LedgerMessages {
  public static readonly MAKE_PAYMENT_BUTTON_TEXT = "Make Payment";
  public static readonly DATE_COLUMN_TEXT = 'Date';
  public static readonly REF_NO_COLUMN_TEXT = 'Ref No';
  public static readonly INST_NO_COLUMN_TEXT = 'Int No';
  public static readonly PARTICULARS_COLUMN_TEXT = 'Particulars';
  public static readonly DEBIT_COLUMN_TEXT = 'Debit';
  public static readonly CREDIT_COLUMN_TEXT = 'Credit';
  public static readonly BALANCE_COLUMN_TEXT = 'Balance';
  public static readonly ARREARS_COLUMN_TEXT = 'Arrears';
  public static readonly REMARKS_COLUMN_TEXT = 'Remarks';
  public static readonly EXPORT_TO_PDF = 'Export To PDF';
}

export const Particulars: { [key: string]: { value: string, display: boolean } } = {
  MONTHLY_RENTAL: { value: 'Monthly Rental', display: false },
  ADVANCE_PAYMENT: { value: 'Advance Payment', display: true },
  PAID_BY_CASH: { value: 'Paid By Cash', display: true },
  PAID_BY_CHEQUE: { value: 'Paid By Cheque', display: true }
};

export class ChangeInstallment {
  public static readonly CHANGE_INSTALLMENT_TITLE = 'Change Installment';
  public static readonly CHANGE_BUTTON_TEXT = 'Change';
  public static readonly NEW_INSTALLMENT_LABEL = 'New Installment';
  public static readonly NEW_MONTH_COUNT_LABEL = 'New Month Count';
  public static readonly BALANCE_LABEL = 'Balance';
}

export class MakePayment {
  public static readonly MAKE_PAYMENT_TITLE = 'Make Payment';
  public static readonly PAY_BUTTON_TEXT = 'Pay';
  public static readonly AMOUNT_LABEL = 'Amount';
  public static readonly ARREARS_LABEL = 'Arrears';
  public static readonly INSTALLMENT_LABEL = 'Installment';
  public static readonly TOTAL_PAYABLE_LABEL = 'Total Payable';
  public static readonly PARTICULARS_LABEL = 'Particulars';
  public static readonly REMARKS_LABEL = 'Remarks';
  public static readonly REFERENCE_NO_LABEL = 'Reference No';
  public static readonly CHEQUE_NUMBER_TEXT = 'Cheque Number';
  public static readonly BANK_TEXT = 'Bank';
  public static readonly REALIZE_DATE = 'Realize Date';
  public static readonly PAYMENT_DATE = 'Payment Date';
}

export class Settlement {
  public static readonly SETTLEMENT_TITLE = 'Settle Payment';
  public static readonly TOTAL_RECEIVABLE_BALANCE_LABEL = 'Total Receivable Balance';
  public static readonly PAID_AMOUNT_LABEL = 'Paid Amount';
  public static readonly REDUCED_INTEREST_LABEL = 'Reduced Interest';
  public static readonly BALANCE_LABEL = 'Balance';
  public static readonly SETTLE_BUTTON_TEXT = 'Settle';
  public static readonly REMARKS_LABEL = 'Remarks';
  public static readonly REFERENCE_NO_LABEL = 'Reference No';
  public static readonly PARTICULARS_LABEL = 'Particulars';
  public static readonly NUMBERS_REGEX = '[0-9]*';
}

export class OldCustomer {
  public static readonly NAME_LABEL = 'Name';
  public static readonly PROJECT_LABEL = 'Project';
  public static readonly ID_LABEL = 'ID';
  public static readonly LOAN_AMOUNT_LABEL = 'Loan Amount';
  public static readonly VIEW_BUTTON_TEXT = 'View';
  public static readonly SETTLED_PAYMENT_LABEL = 'Settled';
  public static readonly VIEW_POPUP_TITLE = 'View Old Customer';
}

export class NavigationMenu {
  public static readonly CUSTOMERS = 'Customers';
  public static readonly EP_CUSTOMERS = 'EP Customers';
  public static readonly OLD_CUSTOMERS = 'Old Customers';
  public static readonly ADVANCED_CUSTOMERS = 'Advanced Customers';
  public static readonly RESALE_CUSTOMERS = 'Resale Customers';
  public static readonly MANAGE_USERS = 'Manage Users';
  public static readonly REPORTS = 'Reports';
  public static readonly ARREARS_REPORTS = 'Arrears Reports';
  public static readonly CASH_COLLECTION_REPORTS = 'Cash Collection Reports';
  public static readonly CUSTOMER_REPORTS = 'Customer Reports';
  public static readonly EP_REPORTS = 'EP Reports';
  public static readonly PROJECTS = 'Projects';
  public static readonly TAGS = 'Tags';
  public static readonly ADMIN_DASHBOARD = 'Admin Dashboard';
}

export class UserManagementMessages {
  public static readonly FIRSTNAME_LABEL = 'First Name';
  public static readonly LASTNAME_LABEL = 'Last Name';
  public static readonly EMAIL_LABEL = 'Email';
  public static readonly CONTACT_NUMBER_LABEL = 'Contact Number';
    public static readonly IS_DISABLE_LABEL = 'Disable';
    public static readonly ADD_NEW_USER = 'Add New User';
    public static readonly PASSWORD_LABEL = 'Password';
  public static readonly DELETE_USER_TITLE = 'Delete User';
  public static readonly DELETE_USER_MESSAGE = 'Are you sure you want to delete this user?';
  public static readonly USER_ADDED_SUCCESSFULLY_MESSAGE_TEXT = 'User added successfully';
}

export class Projects {
  public static readonly ADD_NEW_PROJECT = "Add New Project";
  public static readonly EDIT_PROJECT = "Edit Project";
  public static readonly PURCHASING_DATE = "Purchasing Date";
  public static readonly PURCHASING_PRICE = "Purchasing Price";
  public static readonly EXTEND = "Extend";
  public static readonly ID = "ID";
  public static readonly ADDRESS = "Address";
  public static readonly LAND_NAME = "Land Name";
  public static readonly PROJECT_NAME = "Project Name";
  public static readonly PREVIOUS_OWNER = "Previous Owner";
  public static readonly PRESENT_OWNER = "Present Owner";
  public static readonly DEED_NO = "Deed No";
  public static readonly REMARKS = "Remarks";
  public static readonly DELETE_CONFIRM = "Are you want to delete this project?";
  public static readonly DELETE_TITLE = "Delete Project";
  public static readonly PROJECT_ADDED_SUCCESS = "Project Created Successfully";
  public static readonly PROJECT_UPDATED_SUCCESS = "Project Updated Successfully";
  public static readonly PROJECT_DELETED_SUCCESS = "Project Deleted Successfully";
}

export class ErrorMessages {
  public static readonly EMAIL = `Invalid email address`;
  public static readonly TELEPHONE = `Invalid contact number`;
  public static readonly FIRST_RENTAL_DATE = `Should be greater or than or equal to sale date`;
  public static readonly PASSWORDS_NOT_MATCHING = `Passwords are not matching`;
  public static readonly INCORRECT_OLD_PASSWORD = `Incorrect old password`;
  public static readonly NUMBERS_ONLY = `Numbers only allowed`;
  public static readonly STRONG_PASSWORD_MESSAGE_TEXT = 'Password must be at least 8 characters and contain lowercase and uppercase letters, number and special character.';

  public static required(filedName: string) {
    return `${filedName} is required`;
  }

  public static min(value: number, filedName = "Value") {
    return `${filedName} should be greater than ${value}`;
  }

  public static max(value: number, filedName = "Value") {
    return `${filedName} should be less than ${value}`;
  }
}

export class Reports {
  public static readonly CASH_REPORT_TITLE = 'Cash Collection Report';
  public static readonly CUSTOMER_REPORT_TITLE = 'Customer Report';
  public static readonly ARREARS_REPORT_TITLE = 'Arrears Report';
  public static readonly EP_REPORT_TITLE = 'EP Report';
  public static readonly VIEW = 'View';
  public static readonly BILL_NO = 'Bill No';
  public static readonly LOT_NO = 'Lot No';
  public static readonly NUMBER = 'No';
  public static readonly SALE = 'Sale';
  public static readonly DEED_AND_PLAN = 'Deed & Plan';
  public static readonly ADVANCE = 'Advance';
  public static readonly FULL_PAYMENT = 'Full Payment';
  public static readonly EP = 'EP';
  public static readonly DATE_OF_SALE = 'Date Of Sale';
  public static readonly RENTAL_DATE = 'Rental Date';
  public static readonly CARD_NO = 'Card No';
  public static readonly BACK_TO_REPORTS = 'Back To Reports';
  public static readonly NO_OF_MONTH = 'No Of Month';
  public static readonly VIEW_REPORTS = 'View Reports';
  public static readonly PROJECT_LABEL = 'Project';
  public static readonly ADDRESS = 'Address';
  public static readonly CAPITAL = 'Capital';
  public static readonly DATE = 'Date';
  public static readonly ARREARS = 'Arrears';
  public static readonly MONTHLY_RENTAL = 'Monthly Rental';
  public static readonly TOTAL_ARREARS = 'Total Arrears';
  public static readonly ARREARS_RATE = 'Arrears Rate';
  public static readonly DAYS30 = '30 Days';
  public static readonly DAYS60 = '60 Days';
  public static readonly DAYS90 = '90 Days';
  public static readonly DAYS_MORE90 = 'More Than 90 Days';
  public static readonly NIC = 'NIC';
  public static readonly INTEREST = 'Interest';
  public static readonly CONTACT_NO = 'Contact No';
  public static readonly DOC_CHARGE = 'Document Charge';
  public static readonly BLOCK_NO_LABEL = 'Block No';
  public static readonly NOTE = 'Note';
  public static readonly NAME_LABEL = 'Customer Name';
  public static readonly EP_VALUE = 'EP Value';
  public static readonly NO_DATA = 'No data';
  public static readonly INVALID_DATE_RANGE = 'Invalid date range';
  public static readonly SELECT_DATE_RANGE_TEXT = 'Select Date Range To View Reports';
  public static readonly NO_REPORTS = "There are no reports"
  public static readonly EXPORT_TO_PDF = "Export To PDF";
  public static readonly FILTER = "Filter";
  public static readonly CLEAR_FILTER = "Clear Filter";
  public static readonly REPORT_NUMBER = "Report Number";
  public static readonly REPORT_NAME = "Report Name";
  public static readonly EXPORT_TO_EXCEL = "Export To Excel";
  public static readonly FILTER_TITLE = "Filter Reports";
}

export class Notifications {
  public static readonly DELETE_ALL = 'Delete All';
  public static readonly NO_NOTIFICATIONS_MESSAGE_TEXT = 'There Are No Notifications';
  public static readonly MARK_AS_READ_BUTTON_TEXT = 'Mark as read';
  public static readonly DOWNLOAD_LETTER = 'Download Letter';
  public static readonly MARK_ALL_AS_READ_BUTTON_TEXT = 'Mark all as read';
  public static readonly MARK_AS_UNREAD_BUTTON_TEXT = 'Mark as unread';
}

export class Tags {
  public static readonly ADD_NEW_TAG = "Add New Tag";
  public static readonly EDIT_TAG = "Add New Tag";
  public static readonly TAG_NAME = "Tag Name";
  public static readonly IS_ACTIVE = "Active";
  public static readonly TAG_ID = "Tag Id";
  public static readonly DELETE_CONFIRM = "Are you want to delete this tag?";
  public static readonly DELETE_TITLE = "Delete Tag";
  public static readonly TAG_ADDED_SUCCESS = "Tag Created Successfully";
  public static readonly TAG_UPDATED_SUCCESS = "Tag Updated Successfully";
  public static readonly TAG_DELETED_SUCCESS = "Tag Deleted Successfully";
}

export const NotificationColors: { [key: string]: string; } = {
  SUCCESS: '#84ad88',
  WARNING: '#af914e',
  ERROR: '#e8b3ad',
  INFO: '#90a9c5',
  ARREARS: '#daa78e',
};
