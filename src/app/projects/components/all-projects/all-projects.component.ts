import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { filter, Subscription } from "rxjs";
import { Common, Projects } from "../../../constants";
import { Project } from "../../../types";
import { AddEditProjectComponent } from "../popups/add-edit-project/add-edit-project.component";
import { AppState } from "../../../store/app.state";
import { Store } from "@ngrx/store";
import { projectsSelector } from "../../store/projects.selectors";
import { isTypeMatched } from "../../../helpers/utils";
import { KEYS_OF_PROJECT } from "../../../types.keys";
import { ProjectActions } from "../../store/projects.actions";

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss']
})
export class AllProjectsComponent implements OnInit {

  constructor(
      private router: Router,
      private matDialog: MatDialog,
      private store: Store<AppState>,
  ) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    Projects.ID,
    Projects.PROJECT_NAME,
    Projects.LAND_NAME,
    Projects.ADDRESS,
    Projects.PURCHASING_DATE,
    Projects.PURCHASING_PRICE,
    Projects.EXTEND,
    Projects.PREVIOUS_OWNER,
    Projects.PRESENT_OWNER,
    Projects.DEED_NO,
    Projects.REMARKS,
    'actions'
  ];
  dataSource: MatTableDataSource<Project> = new MatTableDataSource<Project>();
  subscriptions: Subscription[] = [];
  isLoading = true;

  REMARKS_COLUMN = Projects.REMARKS
  DEED_NO_COLUMN = Projects.DEED_NO
  PRESENT_OWNER_COLUMN = Projects.PRESENT_OWNER
  PREVIOUS_OWNER_COLUMN = Projects.PREVIOUS_OWNER
  PROJECT_NAME_COLUMN = Projects.PROJECT_NAME
  LAND_NAME_COLUMN = Projects.LAND_NAME
  ADDRESS_COLUMN = Projects.ADDRESS
  EXTEND_COLUMN = Projects.EXTEND
  ID_COLUMN = Projects.ID
  PURCHASING_PRICE_COLUMN = Projects.PURCHASING_PRICE
  PURCHASING_DATE_COLUMN = Projects.PURCHASING_DATE

  ADD_PROJECT = Projects.ADD_PROJECT_BUTTON_TEXT;
  ACTIONS_COLUMN = Common.ACTION_COLUMN_TEXT;
  SEARCH_PLACEHOLDER = Common.SEARCH_LABEL;
  NO_SEARCH_RESULT_TEXT = Common.NO_SEARCH_RESULT_TEXT;

  ngOnInit() {
    this.store.select(projectsSelector)
        .pipe(filter(projects => isTypeMatched(projects[0], KEYS_OF_PROJECT)))
        .subscribe(data => {
          data = Array.from(data);
          this.dataSource = new MatTableDataSource(data);
          this.isLoading = false;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        })
    this.store.dispatch(ProjectActions.get_all());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnClickAdd() {
    const dialogRef = this.matDialog.open(AddEditProjectComponent, {width: '800px', data: {edit: 0}});

    const subscription = dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    this.subscriptions.push(subscription);
  }

}
