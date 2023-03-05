import { Component, OnInit, ViewChild } from '@angular/core';
import { ErrorMessages, Reports, SnackBarStatus } from "../../../constants";
import { FormBuilder, Validators } from "@angular/forms";
import * as jsPDF from "jspdf";
import { HelperService } from "../../../services/helper.service";
import { MatPaginator } from "@angular/material/paginator";
import firebase from "firebase/compat";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { ReportService } from "../../../services/report.service";
import { CashCollectionReport, Project, Report } from "../../../types";
import { ReportRoutes } from "../../../route-data";
import { ProjectActions } from "../../../projects/store/projects.actions";
import { projectsSelector } from "../../../projects/store/projects.selectors";
import { Store } from "@ngrx/store";
import { ProjectsState } from "../../../projects/store/projects.state";
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-cash-collection-report',
  templateUrl: './cash-collection-report.component.html',
  styleUrls: ['./cash-collection-report.component.scss']
})
export class CashCollectionReportComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService,
    private helperService: HelperService,
    private store: Store<ProjectsState>
  ) {
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoading = false;
  isDateRangeNotSelected = true;
  projects: Project[] = [];

  displayedColumns: string[] = [
    Reports.DATE,
    Reports.BILL_NO,
    Reports.LOT_NO,
    Reports.PROJECT_LABEL,
    Reports.SALE,
    Reports.EP,
    Reports.ADVANCE,
    Reports.FULL_PAYMENT,
    Reports.DEED_AND_PLAN
  ];

  dataSource: MatTableDataSource<CashCollectionReport> = new MatTableDataSource<CashCollectionReport>();
  allReports: CashCollectionReport[] = [];

  REPORTS_URL = `/${ReportRoutes.Root}`;
  REPORT_MESSAGES = Reports;
  VALIDATION_MESSAGES = ErrorMessages;

  dateForm = this.formBuilder.group({
    startDate: this.formBuilder.control('', [Validators.required]),
    endDate: this.formBuilder.control('', [Validators.required])
  });

  ngOnInit(): void {
    this.store.dispatch(ProjectActions.get_all())
    this.store.select(projectsSelector)
      .subscribe(data => {
        if (data == undefined) {
          this.isLoading = true;
        } else {
          debugger;
          this.projects = data;
        }
      });
    const lastMonth = new Date().getMonth() - 1;
    const startDate = new Date(new Date().getFullYear(), lastMonth, 1);
    const endDate = new Date(new Date().getFullYear(), lastMonth, new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate());
    this.dateForm.controls['startDate'].setValue(startDate);
    this.dateForm.controls['endDate'].setValue(endDate);
    this.isDateRangeNotSelected = false;
    this.onClickViewReports();
  }

  onEmitFilter($event: Report[]): void {
    this.dataSource.data = $event as unknown as Array<CashCollectionReport>;
  }

  onClickViewReports() {
    if (this.dateForm.valid) {
      this.isLoading = true;
      this.reportService.GetCashCollectionReport(this.dateForm.value.startDate, this.dateForm.value.endDate).then(data => {
        this.dataSource = new MatTableDataSource<CashCollectionReport>(data.data);
        this.allReports = data.data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      });
    } else {
      this.helperService.openSnackBar({ text: Reports.INVALID_DATE_RANGE, status: SnackBarStatus.FAILED });
    }
  }

  public openPDF(): void {
    // @ts-ignore
    let pdf = new jsPDF();

    pdf.setFontSize(25);
    pdf.text('Cash Collection Report', 60, 15);
    pdf.setFontSize(12);
    pdf.setTextColor(99);

    (pdf as any).autoTable({
      startY: 25,
      showFoot: 'lastPage',
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
      footStyles: {
        fillColor: [220, 220, 220],
        textColor: 0,
        fontStyle: 'bold',
        lineWidth: 0.3,
        lineColor: 200
      },
      head: [
        [
          this.REPORT_MESSAGES.DATE,
          this.REPORT_MESSAGES.BILL_NO,
          this.REPORT_MESSAGES.LOT_NO,
          this.REPORT_MESSAGES.PROJECT_LABEL,
          this.REPORT_MESSAGES.SALE,
          this.REPORT_MESSAGES.EP,
          this.REPORT_MESSAGES.ADVANCE,
          this.REPORT_MESSAGES.FULL_PAYMENT,
          this.REPORT_MESSAGES.DEED_AND_PLAN
        ]
      ],
      body: this.dataSource.data.map(
        row => {
          const date = row.Date as Timestamp;
          return [
            date.toDate().toLocaleDateString(),
            row.BillNo,
            row.LotNo,
            row.Project,
            parseFloat(row.Sale).toFixed(2),
            parseFloat(row.EP).toFixed(2),
            parseFloat(row.Advance).toFixed(2),
            parseFloat(row.FullPayment).toFixed(2),
            parseFloat(row.DeedAndPlan).toFixed(2)
          ];
        }
      ),
      foot: [
        ["", "", "", "", this.getTotalSale(), this.getTotalEP(), this.getTotalAdvance(), this.getTotalFullPayment(), this.getTotalDeedAndPlan()]
      ]
      ,
      theme: 'grid'
    });

    // Open PDF document in browser's new tab
    pdf.output('dataurlnewwindow')
  }

  getTotalSale() {
    return this.dataSource.data.map(r => r.Sale).reduce((acc, value) => +acc + +value, 0);
  }

  getTotalEP() {
    return this.dataSource.data.map(r => r.EP).reduce((acc, value) => +acc + +value, 0);
  }

  getTotalAdvance() {
    return this.dataSource.data.map(r => r.Advance).reduce((acc, value) => +acc + +value, 0);
  }

  getTotalFullPayment() {
    return this.dataSource.data.map(r => r.FullPayment).reduce((acc, value) => +acc + +value, 0);
  }

  getTotalDeedAndPlan() {
    return this.dataSource.data.map(r => r.DeedAndPlan).reduce((acc, value) => +acc + +value, 0);
  }

}
