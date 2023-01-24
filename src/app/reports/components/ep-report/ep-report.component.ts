import { Component, OnInit, ViewChild } from '@angular/core';
import jsPDF from "jspdf";
import { MatSort } from "@angular/material/sort";
import { ReportService } from "../../../services/report.service";
import { Reports } from "../../../constants";
import { EPReport } from "../../../types";
import { MatPaginator } from "@angular/material/paginator";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;
import { MatTableDataSource } from "@angular/material/table";
import { ReportRoutes } from "../../../route-data";

@Component({
  selector: 'app-ep-report',
  templateUrl: './ep-report.component.html',
  styleUrls: ['./ep-report.component.scss']
})
export class EpReportComponent implements OnInit {

  constructor(
      private reportService: ReportService
  ) {
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoading = true;
  displayedColumns: string[] = [
    Reports.PROJECT_LABEL,
    Reports.BLOCK_NO_LABEL,
    Reports.RENTAL_DATE,
    Reports.NO_OF_MONTH,
    Reports.EP_VALUE,
    Reports.CAPITAL,
    Reports.INTEREST,
    Reports.DOC_CHARGE
  ];

  dataSource: MatTableDataSource<EPReport> = new MatTableDataSource<EPReport>();

  PROJECT = Reports.PROJECT_LABEL;
  BLOCK_NO = Reports.BLOCK_NO_LABEL;
  RENTAL_DATE = Reports.RENTAL_DATE;
  NO_OF_MONTH = Reports.NO_OF_MONTH;
  EP_VALUE = Reports.EP_VALUE;
  CAPITAL = Reports.CAPITAL;
  INTEREST = Reports.INTEREST;
  DOC_CHARGE = Reports.DOC_CHARGE;
  NO_DATA = Reports.NO_DATA;
  TITLE = Reports.REPORT_TITLE;
  NO_REPORTS = Reports.NO_REPORTS;
  EXPORT = Reports.EXPORT;
  REPORTS_URL = `/${ReportRoutes.Root}`;
  BACK = Reports.BACK_TO_REPORTS;

  ngOnInit(): void {
    this.reportService.GetEPReport().then(response => {
      this.dataSource = new MatTableDataSource<EPReport>(response.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
    })
  }

  public openPDF(): void {
    // @ts-ignore
    var pdf = new jsPDF();

    pdf.setFontSize(25);
    pdf.text('EP Report', 75, 15);
    pdf.setFontSize(12);
    pdf.setTextColor(99);

    (pdf as any).autoTable({
      startY: 25,
      showFoot: 'never',
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
      head: [
        [this.PROJECT, this.BLOCK_NO, this.RENTAL_DATE, this.NO_OF_MONTH, this.EP_VALUE, this.CAPITAL, this.INTEREST, this.DOC_CHARGE]
      ],
      body: this.dataSource.data.map(
          row => {
            const date = row.RentalDate as Timestamp;
            return [
              row.Project,
              row.BlockNo,
              date.toDate().getDay(),
              row.NumberOfMonth,
              row.EPValue.toFixed(2),
              row.Capital.toFixed(2),
              row.Interest.toFixed(2),
              row.DocumentCharge.toFixed(2)
            ];
          }
      ),
      theme: 'grid'
    });

    // Open PDF document in browser's new tab
    pdf.output('dataurlnewwindow')
  }


}
