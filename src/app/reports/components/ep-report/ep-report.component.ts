import { Component, OnInit, ViewChild } from '@angular/core';
import jsPDF from "jspdf";
import { MatSort } from "@angular/material/sort";
import { ReportService } from "../../../services/report.service";
import { Reports } from "../../../constants";
import { EPReport, Project } from "../../../types";
import { MatPaginator } from "@angular/material/paginator";
import firebase from "firebase/compat";
import { MatTableDataSource } from "@angular/material/table";
import { ReportRoutes } from "../../../route-data";
import { FormBuilder } from "@angular/forms";
import { Store } from "@ngrx/store";
import { ProjectsState } from "../../../projects/store/projects.state";
import { ProjectActions } from "../../../projects/store/projects.actions";
import { projectsSelector } from "../../../projects/store/projects.selectors";
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-ep-report',
  templateUrl: './ep-report.component.html',
  styleUrls: ['./ep-report.component.scss']
})
export class EpReportComponent implements OnInit {

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
  projects: Project[] = [];
  allReports: EPReport[] = [];
  projectId = this.formBuilder.control('');

  REPORT_MESSAGES = Reports;
  REPORTS_URL = `/${ReportRoutes.Root}`;

  constructor(private reportService: ReportService, private formBuilder: FormBuilder, private store: Store<ProjectsState>) {
  }

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
    this.reportService.GetEPReport().then(response => {
      this.dataSource = new MatTableDataSource<EPReport>(response.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
    });
  }

  filterReports() {
    if (this.projectId.value.length > 0) {
      let projectIds: string[] = this.projectId.value;
      let projectNames: string[] = this.projects.filter(p => projectIds.includes(p.ID)).map(p => p.ProjectName);
      this.dataSource.data = this.allReports.filter(p => projectNames.includes(p.Project));
    } else {
      this.dataSource.data = this.allReports;
    }
  }

  public openPDF(): void {
    // @ts-ignore
    let pdf = new jsPDF();

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
        [
          Reports.PROJECT_LABEL,
          Reports.BLOCK_NO_LABEL,
          Reports.RENTAL_DATE,
          Reports.NO_OF_MONTH,
          Reports.EP_VALUE,
          Reports.CAPITAL,
          Reports.INTEREST,
          Reports.DOC_CHARGE
        ]
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
