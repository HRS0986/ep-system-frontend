import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { ProjectService } from "../../../services/projects.service";
import { HelperService } from "../../../services/helper.service";
import { ActionMenuItem, Project } from "../../../types";
import { Common, Projects, SnackBarStatus } from "../../../constants";
import { AddEditProjectComponent } from "../popups/add-edit-project/add-edit-project.component";
import { DeleteConfirmPopupComponent } from "../../../delete-confirm-popup/delete-confirm-popup.component";

@Component({
    selector: 'app-action-menu',
    templateUrl: './action-menu.component.html',
    styleUrls: ['./action-menu.component.scss']
})
export class ActionMenuComponent implements OnInit {

    constructor(
        private router: Router,
        private matDialog: MatDialog,
        private projectsService: ProjectService,
        private helperService: HelperService
    ) {
    }

    @Input() data!: Project;

    ACTION_MENU_ITEMS: ActionMenuItem<ActionMenuComponent>[] = [
        {
            actionText: Common.DELETE,
            iconName: 'delete',
            action: "onClickDelete"
        },
        {
            actionText: Common.EDIT,
            iconName: 'edit',
            action: "onClickEdit"
        }
    ];

    ngOnInit(): void { }

    onClickEdit(): void {
        const dialogRef = this.matDialog.open(AddEditProjectComponent, {
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
                title: Projects.DELETE_TITLE,
                body: Projects.DELETE_CONFIRM,
                entityName: this.data.ProjectName
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.projectsService.DeleteProject(this.data.ID).then(() => {
                    this.helperService.openSnackBar({
                        text: Projects.PROJECT_DELETED_SUCCESS,
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
