export const KEYS_OF_PROJECT = [
    'ID',
    'PurchasingDate',
    'PurchasingPrice',
    'Extend',
    'Address',
    'LandName',
    'ProjectName',
    'PreviousOwner',
    'PresentOwner',
    'DeedNo',
    'IsActive'
];

export const KEYS_OF_USER = [
    'UID',
    'Email',
    'EmailVerified',
    'FirstName',
    'LastName',
    'PhotoURL',
    'IsActive',
    'Disabled',
    'IsFirstLogin',
    'PhoneNumber',
    'CreatedAt',
    'LastSignInAt',
];

export const KEYS_OF_EP_REPORT = [
    "Project",
    "BlockNo",
    "RentalDate",
    "NumberOfMonth",
    "EPValue",
    "Capital",
    "Interest",
    "DocumentCharge"
];

export const KEYS_OF_CUSTOMER_REPORT = [
    "No",
    "DateOfSale",
    "Project",
    "BlockNo",
    "CardNo",
    "CustomerName",
    "Address",
    "IDNumber",
    "ContactNo",
    "Note"
];

export const KEYS_OF_ARREARS_REPORT = [
    "Project",
    "BlockNo",
    "Arrears_3_31",
    "MonthlyRental",
    "TotalArrears",
    "ArrearsRate",
    "Days30",
    "Days60",
    "Days90",
    "Days90More",
    "Name",
    "ContactNo"
];

export const KEYS_OF_CASH_COLLECTION_REPORT = [
    "Date",
    "BillNo",
    "LotNo",
    "Project",
    "Sale",
    "EP",
    "Advance",
    "FullPayment",
    "DeedAndPlan"
];

export const KEYS_OF_CLIENT = [
    'ID',
    'Project',
    'Name',
    'Address',
    'NIC',
    'ContactNo',
    'SaleDate',
    'BondNo',
    'PlanNo',
    'DeedNo',
    'Note',
    'BlockNo',
    'PerchesVal',
    'Extent',
    'TotalBlockValue',
    'SaleValue',
    'Discount',
    'MarketingSaleValue',
    'AdvancePayment',
    'WithoutInterestEpPayment',
    'PaymentEPBalance',
    'DocumentFee',
    'IntPlusEPSaleValue',
    'TotalReceivableBalance',
    'MonthCount',
    'MonthRental',
    'FirstRentalDate',
    'InterestRate',
    'DueDate'
];

export const KEYS_OF_LEDGER = [
    'Date',
    'RefNo',
    'InstallmentNo',
    'Particulars',
    'Amount',
    'Arrears',
    'Balance',
    'Remarks',
];

export const KEYS_OF_NOTIFICATION = [
    'ID',
    'Date',
    'IsActive',
    'Seen',
    'Note',
    'Type',
    'Data',
];
