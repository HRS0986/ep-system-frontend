import { Component, OnInit } from '@angular/core';
import { TypeLIstItem } from "../../../types";
import { Common, Customer, NavigationMenu, Reports } from "../../../constants";
import { MatTableDataSource } from "@angular/material/table";
import { NavigationMenuItems } from "../../../navigation-menu";

@Component({
  selector: 'app-customer-tables',
  templateUrl: './customer-tables.component.html',
  styleUrls: ['./customer-tables.component.scss']
})
export class CustomerTablesComponent implements OnInit {

  constructor() { }

  CUSTOMER_TABLE_LIST: TypeLIstItem[] = []

  VIEW = Reports.VIEW;
  ITEM_NUMBER = "#";
  COMMON_MESSAGES = Common;
  TABLE_NAME = Customer.CUSTOMER_TYPE;

  displayedColumns: string[] = [
    this.ITEM_NUMBER,
    Customer.CUSTOMER_TYPE,
    Common.ACTION_COLUMN_TEXT
  ];

  datasource: MatTableDataSource<TypeLIstItem> = new MatTableDataSource<TypeLIstItem>();

  ngOnInit(): void {
    NavigationMenuItems.forEach(nav => {
      if (nav.menuText === NavigationMenu.CUSTOMERS) {
        nav.subMenuItems.forEach((cType, index) => {
          this.CUSTOMER_TABLE_LIST.push({
            itemTitle: cType.menuText,
            itemUrl: cType.navigationLink,
            itemNumber: index + 1
          });
        });
      }
    });
    this.datasource = new MatTableDataSource(this.CUSTOMER_TABLE_LIST);
  }

}
