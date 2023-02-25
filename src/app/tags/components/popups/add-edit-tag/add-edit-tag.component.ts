import { Component, Inject, OnInit } from '@angular/core';
import { Common, ErrorMessages, SnackBarStatus, Tags, TagTypes } from "../../../../constants";
import { FormBuilder, Validators } from "@angular/forms";
import { HelperService } from "../../../../services/helper.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Tag } from "../../../../types";
import { TagService } from "../../../../services/tag.service";

@Component({
  selector: 'app-add-edit-tag',
  templateUrl: './add-edit-tag.component.html',
  styleUrls: ['./add-edit-tag.component.scss']
})
export class AddEditTagComponent implements OnInit {

  TITLE!: string;
  COMMON_MESSAGES = Common;
  TAG_MESSAGES = Tags;
  VALIDATION_MESSAGES = ErrorMessages;

  isSubmitted = false;
  showErrorMessage = false;

  tagForm = this.formBuilder.group({
    Name: this.formBuilder.control('', [Validators.required]),
    ID: this.formBuilder.control('', [Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder,
    private helperService: HelperService,
    private tagService: TagService,
    private dialogRef: MatDialogRef<AddEditTagComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { tag: Tag, edit: number }
  ) {
  }

  ngOnInit(): void {
    if (this.data.edit == 1) {
      this.TITLE = this.TAG_MESSAGES.EDIT_TAG;
      this.tagForm.controls['Name'].setValue(this.data.tag.Name);
      this.tagForm.controls['ID'].setValue(this.data.tag.Id);
    } else {
      this.TITLE = this.TAG_MESSAGES.ADD_NEW_TAG;
    }
  }

  onClickSave() {
    this.isSubmitted = true;

    if (this.tagForm.valid) {
      const tag: Tag = {
        Name: this.tagForm.value.Name,
        Id: this.tagForm.value.ID,
        IsActive: true,
        Type: TagTypes.CUSTOMER
      };

      this.dialogRef.close();

      if (this.data.edit == 1) {
        this.tagService.updateTag(tag).then(r => {
          if (!r.status) {
            this.helperService.openSnackBar({
              text: r.message,
              status: SnackBarStatus.FAILED
            });
          } else {
            this.helperService.openSnackBar({
              text: Tags.TAG_UPDATED_SUCCESS,
              status: SnackBarStatus.SUCCESS
            });
          }
        });
      } else {
        this.tagService.createNewTag(tag).then(r => {
          if (!r.status) {
            this.helperService.openSnackBar({
              text: r.message,
              status: SnackBarStatus.FAILED
            });
          } else {
            this.helperService.openSnackBar({
              text: Tags.TAG_ADDED_SUCCESS,
              status: SnackBarStatus.SUCCESS
            });
          }
        });
      }
    } else {
      this.showErrorMessage = true;
      this.tagForm.markAllAsTouched();
    }
  }

}
