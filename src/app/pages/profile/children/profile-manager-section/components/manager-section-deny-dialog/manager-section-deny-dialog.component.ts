import { Component, Inject, Input } from '@angular/core';
import { MatButton } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatDivider } from "@angular/material/divider";
import {
  iManagerDenyDialogData
} from '@pages/profile/children/profile-manager-section/components/manager-section-deny-dialog/interfaces/manager-deny-dialog.data,interface';

@Component({
  selector: "app-manager-section-deny-dialog",
  standalone: true,
  imports: [MatButton, MatDialogActions, MatDialogTitle, MatDivider],
  templateUrl: "./manager-section-deny-dialog.component.html",
  styleUrl: "./manager-section-deny-dialog.component.scss",
})
export class ManagerSectionDenyDialogComponent {
  @Input({ required: true })
  public number!: number;

  constructor(
    public dialogRef: MatDialogRef<ManagerSectionDenyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: iManagerDenyDialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    this.dialogRef.close(true);
  }
}
