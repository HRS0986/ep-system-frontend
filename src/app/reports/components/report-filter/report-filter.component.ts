import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project, Report } from "../../../types";
import { Reports } from "../../../constants";

@Component({
  selector: 'report-filter',
  templateUrl: './report-filter.component.html',
  styleUrls: ['./report-filter.component.scss']
})
export class ReportFilterComponent implements OnInit {

  constructor() {
  }

  @Input() allProjects: Project[] = [];
  @Input() allReports: Report[] = [];
  @Output() filterEvent = new EventEmitter<Report[]>();
  selectedProjects: Project[] = [];
  REPORT_MESSAGES = Reports;

  ngOnInit(): void {
  }

  filterReports(): void {
    let reports: Report[] = this.allReports;
    if (this.selectedProjects.length > 0) {
      const selectedProjectNames = this.selectedProjects.map(p => p.ProjectName);
      reports = this.allReports.filter(r => selectedProjectNames.includes(r.Project));
    }
    this.filterEvent.emit(reports);
  }

  clearFilter(): void {
    this.selectedProjects = [];
    this.filterEvent.emit(this.allReports);
  }

}
