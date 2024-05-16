import { Component, Inject } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatDivider } from "@angular/material/divider";
import {
  iManagerAcceptDialogData
} from '@pages/profile/children/profile-manager-section/components/manager-section-accept-dialog/interfaces/manager-accept-dialog.data.interface';

@Component({
  selector: "app-manager-section-accept-dialog",
  standalone: true,
  imports: [MatButton, MatDialogActions, MatDialogTitle, MatDivider],
  templateUrl: "./manager-section-accept-dialog.component.html",
  styleUrl: "./manager-section-accept-dialog.component.scss",
})
export class ManagerSectionAcceptDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ManagerSectionAcceptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: iManagerAcceptDialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    this.dialogRef.close(true);
  }
}
