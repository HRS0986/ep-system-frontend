import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { AllCustomers, Common, CustomerTypes } from "../../../constants";
import { Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Customer } from "../../../types";
import { AddNewCustomerComponent } from "../popups/add-new-customer/add-new-customer.component";
import { Store } from "@ngrx/store";
import { CustomersState } from "../../store/customers.state";
import { AdvancedCustomerActions } from "../../store/customers.actions";
import { advancedCustomerSelector } from "../../store/customers.selectors";

@Component({
  selector: 'app-advanced-customers',
  templateUrl: './advanced-customers.component.html',
  styleUrls: ['./advanced-customers.component.scss']
})
export class AdvancedCustomersComponent implements OnInit {

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

  CUSTOMER_MESSAGES = AllCustomers;
  COMMON_MESSAGES = Common;

  ngOnInit() {
    this.store.select(advancedCustomerSelector)
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
    this.store.dispatch(AdvancedCustomerActions.get_all());
  }

  ngOnClickAdd() {
    const dialogRef = this.matDialog.open(AddNewCustomerComponent, {
      width: '800px',
      data: { customerType: CustomerTypes.ADVANCED_CUSTOMER }
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
