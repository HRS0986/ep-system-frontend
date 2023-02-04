import { Component, OnInit, ViewChild } from '@angular/core';
import jsPDF from "jspdf";
import firebase from "firebase/compat";
import { MatSort } from "@angular/material/sort";
import { ReportService } from "../../../services/report.service";
import { CustomerReport } from "../../../types";
import { Reports } from "../../../constants";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ReportRoutes } from "../../../route-data";
import { Store } from "@ngrx/store";
import { customerReportSelector } from "../../store/reports.selectors";
import { ReportActions } from "../../store/reports.actions";
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.scss']
})
export class CustomerReportComponent implements OnInit {

  constructor(private reportService: ReportService, private store: Store<CustomerReport>) {
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoading = true;
  displayedColumns: string[] = [
    Reports.NUMBER,
    Reports.DATE_OF_SALE,
    Reports.PROJECT_LABEL,
    Reports.BLOCK_NO_LABEL,
    Reports.CARD_NO,
    Reports.NAME_LABEL,
    Reports.ADDRESS,
    Reports.NIC,
    Reports.CONTACT_NO,
    Reports.NOTE
  ];

  dataSource: MatTableDataSource<CustomerReport> = new MatTableDataSource<CustomerReport>();

  NUMBER = Reports.NUMBER;
  DATE_OF_SALE = Reports.DATE_OF_SALE;
  PROJECT = Reports.PROJECT_LABEL;
  BLOCK_NO = Reports.BLOCK_NO_LABEL;
  CARD = Reports.CARD_NO;
  NAME = Reports.NAME_LABEL;
  ADDRESS = Reports.ADDRESS;
  NIC = Reports.NIC;
  CONTACT = Reports.CONTACT_NO;
  NOTE = Reports.NOTE;
  NO_DATA = Reports.NO_DATA;
  TITLE = Reports.REPORT_TITLE;
  NO_REPORTS = Reports.NO_REPORTS;
  EXPORT_TO_PDF = Reports.EXPORT_TO_PDF;
  EXPORT_TO_EXCEL = Reports.EXPORT_TO_EXCEL;
  BACK = Reports.BACK_TO_REPORTS;
  REPORTS_URL = `/${ReportRoutes.Root}`;

  ngOnInit(): void {
    this.store.select(customerReportSelector)
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
    this.store.dispatch(ReportActions.get_customer_report());
  }

  public openPDF(): void {
    // @ts-ignore
    let pdf = new jsPDF('l', 'pt', 'a4');

    pdf.setFontSize(25);
    pdf.text('Customer Report', 325, 35);
    pdf.setFontSize(12);
    pdf.setTextColor(99);

    (pdf as any).autoTable({
      startY: 55,
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
        [this.NUMBER, this.DATE_OF_SALE, this.PROJECT, this.BLOCK_NO, this.CARD, this.NAME, this.ADDRESS, this.NIC, this.CONTACT, this.NOTE]
      ],
      body: this.dataSource.data.map(
        row => {
          const date = row.DateOfSale as Timestamp;
          return [
            row.No,
            date.toDate().toLocaleDateString(),
            row.Project,
            row.BlockNo,
            row.CardNo,
            row.CustomerName,
            row.Address,
            row.IDNumber,
            row.ContactNo,
            row.Note
          ];
        }
      ),
      theme: 'grid'
    });

    // Open PDF document in browser's new tab
    pdf.output('dataurlnewwindow')
  }

}
