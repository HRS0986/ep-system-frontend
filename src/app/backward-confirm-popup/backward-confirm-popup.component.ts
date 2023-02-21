import { Component, OnInit } from '@angular/core';
import { Common } from "../constants";

@Component({
  selector: 'app-backward-confirm-popup',
  templateUrl: './backward-confirm-popup.component.html',
  styleUrls: ['./backward-confirm-popup.component.scss']
})
export class BackwardConfirmPopupComponent implements OnInit {

  constructor() {
  }

  COMMON_MESSAGES = Common;

  ngOnInit(): void {
  }

}
