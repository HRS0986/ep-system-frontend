import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { AllCustomers, Common, OldCustomer } from "../../../constants";
import { Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { Customer } from "../../../types";
import { ViewOldCustomerComponent } from "../popups/view-old-customer/view-old-customer.component";
import { oldCustomerSelector } from "../../store/customers.selectors";
import { OldCustomerActions } from "../../store/customers.actions";
import { Store } from "@ngrx/store";
import { CustomersState } from "../../store/customers.state";

@Component({
  selector: 'app-old-customers',
  templateUrl: './old-customers.component.html',
  styleUrls: ['./old-customers.component.scss']
})
export class OldCustomersComponent implements OnInit {


  constructor(private router: Router, private matDialog: MatDialog, private store: Store<CustomersState>) {
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    OldCustomer.ID_LABEL,
    OldCustomer.NAME_LABEL,
    OldCustomer.PROJECT_LABEL,
    AllCustomers.PAYMENT_EP_BALANCE,
    OldCustomer.LOAN_AMOUNT_LABEL,
    OldCustomer.SETTLED_PAYMENT_LABEL,
    Common.ACTION_COLUMN_TEXT
  ];

  dataSource: MatTableDataSource<Customer> = new MatTableDataSource();
  isLoading = true;

  NAME_LABEL = OldCustomer.NAME_LABEL;
  PROJECT_LABEL = OldCustomer.PROJECT_LABEL;
  ID_LABEL = OldCustomer.ID_LABEL;
  PAYMENT_EP_BALANCE = AllCustomers.PAYMENT_EP_BALANCE;
  LOAN_AMOUNT_LABEL = OldCustomer.LOAN_AMOUNT_LABEL;
  VIEW_BUTTON_TEXT = OldCustomer.VIEW_BUTTON_TEXT;
  SETTLED_PAYMENT_LABEL = OldCustomer.SETTLED_PAYMENT_LABEL;
  ACTIONS = Common.ACTION_COLUMN_TEXT;
  NO_SEARCH_RESULTS = Common.NO_SEARCH_RESULT_TEXT;
  SEARCH_PLACEHOLDER = Common.SEARCH_LABEL;


  ngOnInit() {
    this.store.select(oldCustomerSelector)
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
    this.store.dispatch(OldCustomerActions.get_all());
  }

  ngOnClickViewCustomer(customer: Customer) {
    const dialogRef = this.matDialog.open(ViewOldCustomerComponent, { width: "650px", data: customer });
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
