import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { HelperService } from "../../../services/helper.service";
import { ActionMenuItem, Tag } from "../../../types";
import { Common, SnackBarStatus, Tags } from "../../../constants";
import { DeleteConfirmPopupComponent } from "../../../delete-confirm-popup/delete-confirm-popup.component";
import { AddEditTagComponent } from "../popups/add-edit-tag/add-edit-tag.component";
import { TagService } from "../../../services/tag.service";

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss']
})
export class ActionMenuComponent implements OnInit {

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private tagService: TagService,
    private helperService: HelperService
  ) {
  }

  @Input() data!: Tag;

  ACTION_MENU_ITEMS: ActionMenuItem<ActionMenuComponent>[] = [
    {
      actionText: Common.DELETE_BUTTON_TEXT,
      iconName: 'delete',
      action: "onClickDelete"
    },
    {
      actionText: Common.EDIT,
      iconName: 'edit',
      action: "onClickEdit"
    }
  ];

  ngOnInit(): void {
  }

  onClickEdit(): void {
    const dialogRef = this.matDialog.open(AddEditTagComponent, {
      width: '800px',
      data: { project: this.data, edit: 1 }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onClickDelete(): void {
    debugger;
    const dialogRef = this.matDialog.open(DeleteConfirmPopupComponent, {
      width: '350px',
      data: {
        title: Tags.DELETE_TITLE,
        body: Tags.DELETE_CONFIRM,
        entityName: this.data.Name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tagService.deleteTag(this.data.Id!).then(() => {
          this.helperService.openSnackBar({
            text: Tags.TAG_DELETED_SUCCESS,
            status: SnackBarStatus.SUCCESS
          });
        });
      }
    });
  }

  invokeAction(action: keyof ActionMenuComponent) {
    (this[action] as (() => void))();
  }

}
