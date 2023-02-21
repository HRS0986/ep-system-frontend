import { Component, OnInit, ViewChild } from '@angular/core';
import { Common, SnackBarStatus, UserManagementMessages } from "../../../constants";
import { User } from "../../../types";
import { UserService } from "../../../services/user.service";
import { HelperService } from "../../../services/helper.service";
import { Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { DeleteConfirmPopupComponent } from "../../../delete-confirm-popup/delete-confirm-popup.component";
import { AddEditUserComponent } from "../popups/add-edit-user/add-edit-user.component";
import { Store } from "@ngrx/store";
import { AuthState } from "../../store/auth.state";
import { AuthActions } from "../../store/auth.actions";
import { authUsersSelector } from "../../store/auth.selectors";
import { filter } from "rxjs";
import { isTypeMatched } from "../../../helpers/utils";
import { KEYS_OF_USER } from "../../../types.keys";

@Component({
    selector: 'app-manage-users',
    templateUrl: './manage-users.component.html',
    styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
    constructor(
        private router: Router,
        private matDialog: MatDialog,
        private userService: UserService,
        private helperService: HelperService,
        private store: Store<AuthState>
    ) {
    }

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    displayedColumns: string[] = [
      UserManagementMessages.FIRSTNAME_LABEL,
      UserManagementMessages.LASTNAME_LABEL,
      UserManagementMessages.EMAIL_LABEL,
      UserManagementMessages.CONTACT_NUMBER_LABEL,
      UserManagementMessages.DELETE,
      UserManagementMessages.IS_DISABLE_LABEL
    ];

    dataSource: MatTableDataSource<User> = new MatTableDataSource();
  isLoading = true;
  USERS_MESSAGES = UserManagementMessages;

    ngOnInit() {
      this.store.select(authUsersSelector)
        .pipe(filter(user => isTypeMatched(user[0], KEYS_OF_USER)))
        .subscribe(data => {
          this.dataSource = new MatTableDataSource<User>(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.isLoading = false;
        });
        this.store.dispatch(AuthActions.get_users());
    }

    onUserActiveStatusChange(user: User) {
        const snackBarRef = this.helperService.openAndGetSnackBar({
            text: Common.SAVING,
            status: SnackBarStatus.INFO
        });

        this.userService.UpdateUserStatus(user.UID!, !user.Disabled!).then(r => {
            snackBarRef.dismiss();
            if (!r.status) {
                this.helperService.openSnackBar({ text: r.message, status: SnackBarStatus.FAILED });
            }
        });
    }

    onClickAddNewUser() {
        const dialogRef = this.matDialog.open(AddEditUserComponent, { width: '400px' });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    onClickDelete(id: string) {
        const userName = this.dataSource.data.find(u => u.UID == id);
        const dialogRef = this.matDialog.open(DeleteConfirmPopupComponent, {
            width: '400px',
            data: {
              title: UserManagementMessages.DELETE_USER_TITLE,
              body: UserManagementMessages.DELETE_USER_MESSAGE,
              entityName: userName
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.userService.DeleteUser(id).then((result) => {
                    if (result.status) {
                        this.helperService.openSnackBar({ text: result.message, status: SnackBarStatus.SUCCESS });
                    } else {
                        this.helperService.openSnackBar({ text: result.message, status: SnackBarStatus.FAILED });
                    }
                });
            }
        });
    }

}
