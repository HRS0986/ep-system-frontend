import { Component, OnInit } from '@angular/core';
import { Common, Reports } from "../../../constants";
import { ReportRoutes } from "../../../route-data";
import { MatTableDataSource } from "@angular/material/table";
import { TypeLIstItem } from "../../../types";

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

  REPORT_ITEMS: TypeLIstItem[] = [
    {
      itemTitle: Reports.CASH_REPORT_TITLE,
      itemNumber: 1,
      itemUrl: ReportRoutes.CashCollection.url
    },
    {
      itemTitle: Reports.CUSTOMER_REPORT_TITLE,
      itemNumber: 2,
      itemUrl: ReportRoutes.Customer.url
    },
    {
      itemTitle: Reports.ARREARS_REPORT_TITLE,
      itemNumber: 3,
      itemUrl: ReportRoutes.Arrears.url
    },
    {
      itemTitle: Reports.EP_REPORT_TITLE,
      itemNumber: 4,
      itemUrl: ReportRoutes.Ep.url
    }
  ]
  displayedColumns: string[] = [
    Reports.REPORT_NUMBER,
    Reports.REPORT_NAME,
    Common.ACTION_COLUMN_TEXT
  ];

  REPORT_MESSAGES = Reports;
  COMMON_MESSAGES = Common;

  datasource: MatTableDataSource<TypeLIstItem> = new MatTableDataSource<TypeLIstItem>();

  constructor() {
  }

  ngOnInit(): void {
    this.datasource = new MatTableDataSource(this.REPORT_ITEMS);
  }

}
