import { Component, Inject, OnInit } from '@angular/core';
import { Notification } from "../../../../types";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Common, Letter, NewCustomer } from "../../../../constants";

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss']
})
export class LetterComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public notification: Notification,
  ) { }

  LETTER_DETAILS = Letter.REMINDER_POPUP_TITLE;
  ADDRESS = NewCustomer.BasicDetails.ADDRESS_LABEL;
  AUTO_FILL_ADDRESS = Letter.AUTO_FILL_ADDRESS;
  CANCEL_BUTTON_TEXT = Common.CANCEL_BUTTON_TEXT;
  CLOSE_BUTTON_TEXT = Common.CLOSE_BUTTON_TEXT;
  OK_BUTTON_TEXT = Letter.OK_BUTTON_TEXT;
  CUSTOMER_ADDRESS = this.notification.Data.Client.Address;
  autoFillAddress = true;

  ngOnInit(): void {
  }

}
