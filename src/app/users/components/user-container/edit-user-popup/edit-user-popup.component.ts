import { Inject, Component } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { User } from "../../../../../../common/models/user.model";

@Component({
  selector: 'edit-user-popup',
  templateUrl: 'edit-user-popup.component.html',
})
export class EditUserPopup {

  constructor(
    public dialogRef: MatDialogRef<EditUserPopup>,
    @Inject(MAT_DIALOG_DATA) public data: User) {
  }

  cancelClick(): void {
    this.dialogRef.close();
  }
}

