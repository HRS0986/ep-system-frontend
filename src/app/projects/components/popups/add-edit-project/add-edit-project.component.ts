import { Component, Inject, OnInit } from '@angular/core';
import { Common, ErrorMessages, Projects, SnackBarStatus } from "../../../../constants";
import { FormBuilder, Validators } from "@angular/forms";
import { ProjectService } from "../../../../services/projects.service";
import { HelperService } from "../../../../services/helper.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Project } from "../../../../types";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrls: ['./add-edit-project.component.scss']
})
export class AddEditProjectComponent implements OnInit {

  TITLE!: string;
  COMMON_MESSAGES = Common;
  PROJECT_MESSAGES = Projects;
  VALIDATION_MESSAGES = ErrorMessages;

  isSubmitted = false;
  showErrorMessage = false;

  projectForm = this.formBuilder.group({
    PurchasingDate: this.formBuilder.control('', [Validators.required]),
    PurchasingPrice: this.formBuilder.control(0, [Validators.required, Validators.min(1)]),
    Extend: this.formBuilder.control('', [Validators.required]),
    Address: this.formBuilder.control('', [Validators.required]),
    LandName: this.formBuilder.control('', [Validators.required]),
    ProjectName: this.formBuilder.control('', [Validators.required]),
    PreviousOwner: this.formBuilder.control('', [Validators.required]),
    PresentOwner: this.formBuilder.control('', [Validators.required]),
    DeedNo: this.formBuilder.control('', [Validators.required]),
    Remarks: this.formBuilder.control(''),
    ID: this.formBuilder.control('')
  });

  constructor(
    private formBuilder: FormBuilder,
    private helperService: HelperService,
    private projectService: ProjectService,
    private dialogRef: MatDialogRef<AddEditProjectComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { project: Project, edit: number }
  ) {
  }

  ngOnInit(): void {
    if (this.data.edit == 1) {
      this.TITLE = this.PROJECT_MESSAGES.EDIT_PROJECT;
      this.projectForm.controls['Address'].setValue(this.data.project.Address);
      this.projectForm.controls['DeedNo'].setValue(this.data.project.DeedNo);
      this.projectForm.controls['Extend'].setValue(this.data.project.Extend);
      this.projectForm.controls['ProjectName'].setValue(this.data.project.ProjectName);
      this.projectForm.controls['LandName'].setValue(this.data.project.LandName);
      this.projectForm.controls['Remarks'].setValue(this.data.project.Remarks);
      this.projectForm.controls['PresentOwner'].setValue(this.data.project.PresentOwner);
      this.projectForm.controls['PreviousOwner'].setValue(this.data.project.PreviousOwner);
      this.projectForm.controls['PurchasingPrice'].setValue(this.data.project.PurchasingPrice);
      let date = this.data.project.PurchasingDate as Timestamp;
      this.projectForm.controls['PurchasingDate'].setValue(date.toDate());
      this.projectForm.controls['ID'].setValue(this.data.project.ID);
    } else {
      this.TITLE = this.PROJECT_MESSAGES.ADD_NEW_PROJECT;
    }
  }

  onClickSave() {
    this.isSubmitted = true;

    if (this.projectForm.valid) {
      const project: Project = {
        Address: this.projectForm.value.Address,
        DeedNo: this.projectForm.value.DeedNo,
        Extend: this.projectForm.value.Extend,
        ProjectName: this.projectForm.value.ProjectName,
        LandName: this.projectForm.value.LandName,
        Remarks: this.projectForm.value.Remarks || "",
        PresentOwner: this.projectForm.value.PresentOwner,
        PreviousOwner: this.projectForm.value.PreviousOwner,
        PurchasingPrice: this.projectForm.value.PurchasingPrice,
        PurchasingDate: new Date(this.projectForm.value.PurchasingDate),
        ID: this.projectForm.value.ID,
        IsActive: true
      };

      this.dialogRef.close();

      if (this.data.edit == 1) {
        this.projectService.UpdateProject(project).then(r => {
          if (!r.status) {
            this.helperService.openSnackBar({
              text: r.message,
              status: SnackBarStatus.FAILED
            });
          } else {
            this.helperService.openSnackBar({
              text: Projects.PROJECT_UPDATED_SUCCESS,
              status: SnackBarStatus.SUCCESS
            });
          }
        });
      } else {
        this.projectService.CreateProject(project).then(r => {
          if (!r.status) {
            this.helperService.openSnackBar({
              text: r.message,
              status: SnackBarStatus.FAILED
            });
          } else {
            this.helperService.openSnackBar({
              text: Projects.PROJECT_ADDED_SUCCESS,
              status: SnackBarStatus.SUCCESS
            });
          }
        });
      }
    } else {
      this.showErrorMessage = true;
      this.projectForm.markAllAsTouched();
    }
  }

  getPriceError(): string {
    if (this.projectForm.controls["PurchasingPrice"].hasError("min")) {
      return this.VALIDATION_MESSAGES.min(1, this.PROJECT_MESSAGES.PURCHASING_PRICE);
    }
    return this.VALIDATION_MESSAGES.required(this.PROJECT_MESSAGES.PURCHASING_PRICE);
  }
}
