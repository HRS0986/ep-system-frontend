import { Component, Inject, OnInit } from '@angular/core';
import { AllCustomers, Common } from "../constants";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DeleteConfig } from "../types";

@Component({
  selector: 'app-delete-confirm-popup',
  templateUrl: './delete-confirm-popup.component.html',
  styleUrls: ['./delete-confirm-popup.component.scss']
})
export class DeleteConfirmPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DeleteConfig) { }

  DELETE = AllCustomers.DELETE_BUTTON_TEXT;
  CANCEL = Common.CANCEL_BUTTON_TEXT;


  ngOnInit(): void {
  }

}
