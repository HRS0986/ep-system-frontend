import { Component, OnInit } from '@angular/core';
import { Common, Reports } from "../../../constants";
import { ReportRoutes } from "../../../route-data";
import { MatTableDataSource } from "@angular/material/table";
import { ReportItem } from "../../../types";

@Component({
    selector: 'app-report-list',
    templateUrl: './report-list.component.html',
    styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

    constructor() {
    }

    REPORT_ITEMS: ReportItem[] = [
        {
            reportTitle: Reports.CASH_REPORT_TITLE,
            reportNumber: 1,
            reportUrl: ReportRoutes.CashCollection.url
        },
        {
            reportTitle: Reports.CUSTOMER_REPORT_TITLE,
            reportNumber: 2,
            reportUrl: ReportRoutes.Customer.url
        },
        {
            reportTitle: Reports.ARREARS_REPORT_TITLE,
            reportNumber: 3,
            reportUrl: ReportRoutes.Arrears.url
        },
        {
            reportTitle: Reports.EP_REPORT_TITLE,
            reportNumber: 4,
            reportUrl: ReportRoutes.Ep.url
        }
    ]

    displayedColumns: string[] = [
        Reports.REPORT_NUMBER,
        Reports.REPORT_NAME,
        Common.ACTION_COLUMN_TEXT
    ];

    VIEW = Reports.VIEW;
    REPORT_NUMBER = Reports.REPORT_NUMBER;
    REPORT_NAME = Reports.REPORT_NAME;
    NO_DATA = Common.NO_SEARCH_RESULT_TEXT;
    ACTIONS = Common.ACTION_COLUMN_TEXT;
    datasource: MatTableDataSource<ReportItem> = new MatTableDataSource<ReportItem>();

    ngOnInit(): void {
        this.datasource = new MatTableDataSource(this.REPORT_ITEMS);
    }

}
