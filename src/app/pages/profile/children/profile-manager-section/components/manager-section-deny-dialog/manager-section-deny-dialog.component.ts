import { Component, Inject, Input } from "@angular/core";
import { MatButton } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatDivider } from "@angular/material/divider";
import { IManagerDenyDialogData } from "./interfaces/manager-deny-dialog.data,interface";
import { MaterialModule } from "@shared/modules/material/material.module";

@Component({
  selector: "app-manager-section-deny-dialog",
  standalone: true,
  imports: [MaterialModule, MatDivider],
  templateUrl: "./manager-section-deny-dialog.component.html",
  styleUrl: "./manager-section-deny-dialog.component.scss",
})
export class ManagerSectionDenyDialogComponent {
  @Input({ required: true })
  public number!: number;

  constructor(
    public dialogRef: MatDialogRef<ManagerSectionDenyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IManagerDenyDialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    this.dialogRef.close(true);
  }
}
