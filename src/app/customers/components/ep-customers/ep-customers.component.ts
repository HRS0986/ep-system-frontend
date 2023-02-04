import { Component, OnInit, ViewChild } from '@angular/core';
import { AllCustomers, Common, CustomerTypes } from "../../../constants";
import { Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { Customer } from "../../../types";
import { AddNewCustomerComponent } from "../popups/add-new-customer/add-new-customer.component";
import { epCustomerSelector } from "../../store/customers.selectors";
import { EpCustomerActions } from "../../store/customers.actions";
import { Store } from "@ngrx/store";
import { CustomersState } from "../../store/customers.state";

@Component({
  selector: 'app-ep-customers',
  templateUrl: './ep-customers.component.html',
  styleUrls: ['./ep-customers.component.scss']
})
export class EpCustomersComponent implements OnInit {

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private store: Store<CustomersState>
  ) {
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    AllCustomers.ID_COLUMN_TEXT,
    AllCustomers.NAME_COLUMN_TEXT,
    AllCustomers.PROJECT_COLUMN_TEXT,
    AllCustomers.BALANCE_COLUMN_TEXT,
    AllCustomers.ARREARS_COLUMN_TEXT,
    AllCustomers.PAYMENT_EP_BALANCE,
    Common.ACTION_COLUMN_TEXT
  ];

  dataSource: MatTableDataSource<Customer> = new MatTableDataSource<Customer>();
  isLoading = true;

  ADD_CUSTOMER_BUTTON_TEXT = AllCustomers.ADD_CUSTOMER_BUTTON_TEXT;
  ID_COLUMN = AllCustomers.ID_COLUMN_TEXT;
  NAME_COLUMN = AllCustomers.NAME_COLUMN_TEXT;
  PROJECT_COLUMN = AllCustomers.PROJECT_COLUMN_TEXT;
  BALANCE_COLUMN = AllCustomers.BALANCE_COLUMN_TEXT;
  ARREARS_COLUMN = AllCustomers.ARREARS_COLUMN_TEXT;
  PAYMENT_EP_BALANCE = AllCustomers.PAYMENT_EP_BALANCE;
  ACTIONS_COLUMN = Common.ACTION_COLUMN_TEXT;
  SEARCH_PLACEHOLDER = Common.SEARCH_LABEL;
  NO_SEARCH_RESULT_TEXT = Common.NO_SEARCH_RESULT_TEXT;

  ngOnInit() {
    this.store.select(epCustomerSelector)
      .subscribe(data => {
        if (data == undefined) {
          this.isLoading = true;
        } else {
          data = Array.from(data!);
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.isLoading = false;
        }
      });
    this.store.dispatch(EpCustomerActions.get_all());
  }

  ngOnClickAdd() {
    const dialogRef = this.matDialog.open(AddNewCustomerComponent, {
      width: '800px',
      data: { customerType: CustomerTypes.EP_CUSTOMER }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
