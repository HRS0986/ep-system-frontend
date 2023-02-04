import { Component, OnInit } from '@angular/core';
import { TypeLIstItem } from "../../../types";
import { Common, Customer, NavigationMenu, Reports } from "../../../constants";
import { CustomerRoutes } from "../../../route-data";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-customer-tables',
  templateUrl: './customer-tables.component.html',
  styleUrls: ['./customer-tables.component.scss']
})
export class CustomerTablesComponent implements OnInit {

  constructor() { }

  CUSTOMER_TABLE_LIST: TypeLIstItem[] = [
    {
      itemTitle: NavigationMenu.EP_CUSTOMERS,
      itemNumber: 1,
      itemUrl: CustomerRoutes.Ep.url
    },
    {
      itemTitle: NavigationMenu.ADVANCED_CUSTOMERS,
      itemNumber: 2,
      itemUrl: CustomerRoutes.Advanced.url
    },
    {
      itemTitle: NavigationMenu.OLD_CUSTOMERS,
      itemNumber: 3,
      itemUrl: CustomerRoutes.Old.url
    },
  ]


  VIEW = Reports.VIEW;
  ITEM_NUMBER = "#";
  TABLE_NAME = Customer.CUSTOMER_TYPE;
  ACTIONS = Common.ACTION_COLUMN_TEXT;
  NO_DATA = Common.NO_SEARCH_RESULT_TEXT;

  displayedColumns: string[] = [
    this.ITEM_NUMBER,
    this.TABLE_NAME,
    this.ACTIONS
  ];

  datasource: MatTableDataSource<TypeLIstItem> = new MatTableDataSource<TypeLIstItem>();

  ngOnInit(): void {
    this.datasource = new MatTableDataSource(this.CUSTOMER_TABLE_LIST);
  }

}
