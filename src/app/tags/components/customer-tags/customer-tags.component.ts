import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { Common, Tags } from "../../../constants";
import { MatTableDataSource } from "@angular/material/table";
import { Tag } from "../../../types";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { TagsState } from "../../store/tags.state";
import { tagsSelector } from "../../store/tags.selectors";
import { AddEditTagComponent } from "../popups/add-edit-tag/add-edit-tag.component";
import { TagActions } from "../../store/tags.actions";

@Component({
  selector: 'app-customer-tags',
  templateUrl: './customer-tags.component.html',
  styleUrls: ['./customer-tags.component.scss']
})
export class CustomerTagsComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    Tags.TAG_ID,
    Tags.TAG_NAME,
    Common.ACTION_COLUMN_TEXT
  ];

  dataSource: MatTableDataSource<Tag> = new MatTableDataSource<Tag>();
  isLoading = true;

  TAG_MESSAGES = Tags;
  COMMON_MESSAGES = Common;

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private store: Store<TagsState>,
  ) {
  }

  ngOnInit() {
    this.store.dispatch(TagActions.get_all());
    this.store.select(tagsSelector)
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
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnClickAdd() {
    const dialogRef = this.matDialog.open(AddEditTagComponent, { width: '400px', data: { edit: 0 } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
