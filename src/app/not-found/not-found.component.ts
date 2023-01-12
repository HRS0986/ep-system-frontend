import { Component, OnInit } from '@angular/core';
import { Common } from "../constants";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  PAGE_NOT_FOUND = Common.PAGE_NOT_FOUND;

  ngOnInit(): void {
  }

}
