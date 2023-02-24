import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from "@angular/material/snack-bar";
import { SnackBarConfig } from "../types";
import { AuthMessages } from "../constants";
import { MatDialog } from "@angular/material/dialog";
import { BackwardConfirmPopupComponent } from "../backward-confirm-popup/backward-confirm-popup.component";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private matSnackBar: MatSnackBar, private matDialog: MatDialog) {
  }

  openSnackBar(config: SnackBarConfig) {
    const action = config.action || 'x'
    this.matSnackBar.open(config.text, action, {
      horizontalPosition: config.positionX || 'end',
      verticalPosition: config.positionY || 'top',
      duration: config.duration || 5000,
      panelClass: [config.status]
    });
  }

  openAndGetSnackBar(config: SnackBarConfig):MatSnackBarRef<TextOnlySnackBar> {
    const action = config.action || 'x'
    return this.matSnackBar.open(config.text, action, {
      horizontalPosition: config.positionX || 'end',
      verticalPosition: config.positionY || 'top',
      duration: config.duration || 5000,
      panelClass: [config.status]
    });
  }

  generateStrongPassword(): string {
    let password = '';
    const strongPasswordRegex = new RegExp(AuthMessages.STRONG_PASSWORD_REGEX);
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*`()_+-={}[]:;<>,.?/';
    for (let i = 0; i < 10; i++) {
      password += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    if (!strongPasswordRegex.test(password)) {
      this.generateStrongPassword();
    }
    return password;
  }

  canGoBack(): Promise<boolean> {
    const dialogRef = this.matDialog.open(BackwardConfirmPopupComponent, { width: '400px' });
    return lastValueFrom(dialogRef.afterClosed());
  }
}
