import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSort } from "@angular/material/sort";
import { ReportService } from "../../../services/report.service";
import { MatPaginator } from "@angular/material/paginator";
import { Reports } from "../../../constants";
import { MatTableDataSource } from "@angular/material/table";
import { ArrearsReport } from "../../../types";
import { ReportRoutes } from "../../../route-data";
import { Store } from "@ngrx/store";
import { ReportsState } from "../../store/reports.state";
import { arrearsReportSelector } from "../../store/reports.selectors";
import { filter } from "rxjs";
import { KEYS_OF_ARREARS_REPORT, KEYS_OF_EP_REPORT } from "../../../types.keys";
import { isTypeMatched } from "../../../helpers/utils";
import { ReportActions } from "../../store/reports.actions";

@Component({
    selector: 'app-arrears-report',
    templateUrl: './arrears-report.component.html',
    styleUrls: ['./arrears-report.component.scss']
})
export class ArrearsReportComponent implements OnInit {

    constructor(private reportService: ReportService, private store: Store<ReportsState>) {
    }

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild("reportTable") reportTable!: ElementRef;

    isLoading = true;
    displayedColumns: string[] = [
        Reports.PROJECT_LABEL,
        Reports.BLOCK_NO_LABEL,
        Reports.ARREARS,
        Reports.MONTHLY_RENTAL,
        Reports.TOTAL_ARREARS,
        Reports.ARREARS_RATE,
        Reports.DAYS30,
        Reports.DAYS60,
        Reports.DAYS90,
        Reports.DAYS_MORE90,
        Reports.NAME_LABEL,
        Reports.CONTACT_NO
    ];

    dataSource: MatTableDataSource<ArrearsReport> = new MatTableDataSource<ArrearsReport>();

    PROJECT = Reports.PROJECT_LABEL;
    BLOCK_NO = Reports.BLOCK_NO_LABEL;
    NAME = Reports.NAME_LABEL;
    CONTACT = Reports.CONTACT_NO;
    TOTAL_ARREARS = Reports.TOTAL_ARREARS;
    ARREARS = Reports.ARREARS;
    ARREARS_RATE = Reports.ARREARS_RATE;
    MONTHLY = Reports.MONTHLY_RENTAL;
    ARREARS_30_DAYS = Reports.DAYS30;
    ARREARS_60_DAYS = Reports.DAYS60;
    ARREARS_90_DAYS = Reports.DAYS90;
    ARREARS_MORE_THAN_90_DAYS = Reports.DAYS_MORE90;
    NO_DATA = Reports.NO_DATA;
    NO_REPORTS = Reports.NO_REPORTS;
    EXPORT_TO_PDF = Reports.EXPORT_TO_PDF;
    EXPORT_TO_EXCEL = Reports.EXPORT_TO_EXCEL;
    BACK = Reports.BACK_TO_REPORTS;
    REPORTS_URL = `/${ReportRoutes.Root}/${ReportRoutes.Arrears}`;

    ngOnInit(): void {
      this.store.select(arrearsReportSelector)
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
        })
        this.store.dispatch(ReportActions.get_arrears_report());
    }

    public openPDF(): void {
        // @ts-ignore
        let pdf = new jsPDF("l", "pt", "a4");

        pdf.setFontSize(25);
        pdf.text('Arrears Report', 325, 35);
        pdf.setFontSize(12);
        pdf.setTextColor(99);

        (pdf as any).autoTable({
            startY: 55,
            showFoot: 'never',
            margin: { top: 40, left: 15, right: 15, bottom: 40 },
            styles: {
                halign: 'center',
                valign: 'top'
            },
            headStyles: {
                fillColor: [253, 253, 253],
                textColor: 0,
                fontStyle: 'bold',
                lineWidth: 0.3,
                lineColor: 200
            },
            head: [[this.PROJECT, this.BLOCK_NO, this.ARREARS, this.MONTHLY, this.TOTAL_ARREARS, this.ARREARS_RATE, this.ARREARS_30_DAYS, this.ARREARS_60_DAYS, this.ARREARS_90_DAYS, this.ARREARS_MORE_THAN_90_DAYS, this.NAME, this.CONTACT]],
            body: this.dataSource.data.map(
                row => [
                    row.Project,
                    row.BlockNo,
                    row.Arrears_3_31.toFixed(2),
                    row.MonthlyRental.toFixed(2),
                    row.TotalArrears.toFixed(2),
                    row.ArrearsRate.toFixed(2),
                    row.Days30.toFixed(2),
                    row.Days60.toFixed(2),
                    row.Days90.toFixed(2),
                    row.Days90More.toFixed(2),
                    row.Name,
                    row.ContactNo
                ]
            ),
            theme: 'grid'
        });

        // Open PDF document in browser's new tab
        pdf.output('dataurlnewwindow')
    }

}
