import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSort } from "@angular/material/sort";
import jsPDF from "jspdf";
import { ReportService } from "../../../services/report.service";
import { MatPaginator } from "@angular/material/paginator";
import { Reports } from "../../../constants";
import { MatTableDataSource } from "@angular/material/table";
import { ArrearsReport, Project } from "../../../types";
import { ReportRoutes } from "../../../route-data";
import { FormBuilder } from "@angular/forms";
import { Store } from "@ngrx/store";
import { ProjectsState } from "../../../projects/store/projects.state";
import { ProjectActions } from "../../../projects/store/projects.actions";
import { projectsSelector } from "../../../projects/store/projects.selectors";

@Component({
  selector: 'app-arrears-report',
  templateUrl: './arrears-report.component.html',
  styleUrls: ['./arrears-report.component.scss']
})
export class ArrearsReportComponent implements OnInit {

  constructor(private reportService: ReportService, private formBuilder: FormBuilder, private store: Store<ProjectsState>) {
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
  projects: Project[] = [];
  projectId = this.formBuilder.control('');

  REPORT_MESSAGES = Reports;
  REPORTS_URL = `/${ReportRoutes.Root}/${ReportRoutes.Arrears}`;

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
    this.reportService.GetArrearsReport().then(response => {
      if (response.data == undefined) {
        this.isLoading = true;
      } else {
        this.dataSource = new MatTableDataSource<ArrearsReport>(response.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      }
    });
  }

  filterReports() {
    if (this.projectId.value.length > 0) {
      let projectIds = this.projectId.value;
      // TODO: Filter Reports
    }
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
      head: [[
        this.REPORT_MESSAGES.PROJECT_LABEL,
        this.REPORT_MESSAGES.BLOCK_NO_LABEL,
        this.REPORT_MESSAGES.ARREARS,
        this.REPORT_MESSAGES.MONTHLY_RENTAL,
        this.REPORT_MESSAGES.TOTAL_ARREARS,
        this.REPORT_MESSAGES.ARREARS_RATE,
        this.REPORT_MESSAGES.DAYS30,
        this.REPORT_MESSAGES.DAYS60,
        this.REPORT_MESSAGES.DAYS90,
        this.REPORT_MESSAGES.DAYS_MORE90,
        this.REPORT_MESSAGES.NAME_LABEL,
        this.REPORT_MESSAGES.CONTACT_NO
      ]],
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
