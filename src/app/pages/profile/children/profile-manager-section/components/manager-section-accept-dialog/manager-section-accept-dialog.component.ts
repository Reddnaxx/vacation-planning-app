import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { IManagerAcceptDialogData } from "./interfaces/manager-accept-dialog.data.interface";
import { MaterialModule } from "@shared/modules/material/material.module";

@Component({
  selector: "app-manager-section-accept-dialog",
  standalone: true,
  imports: [MaterialModule],
  templateUrl: "./manager-section-accept-dialog.component.html",
  styleUrl: "./manager-section-accept-dialog.component.scss",
})
export class ManagerSectionAcceptDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ManagerSectionAcceptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IManagerAcceptDialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    this.dialogRef.close(true);
  }
}
