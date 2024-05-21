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
import { HistoryService } from "@shared/services/history.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-manager-section-deny-dialog",
  standalone: true,
  imports: [MaterialModule, MatDivider],
  templateUrl: "./manager-section-deny-dialog.component.html",
  styleUrl: "./manager-section-deny-dialog.component.scss",
})
export class ManagerSectionDenyDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ManagerSectionDenyDialogComponent>,
    private historyService: HistoryService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: IManagerDenyDialogData,
  ) {}

  protected async onDeny() {
    this.dialogRef.close();
    this.dialogRef.close();
    await this.historyService.update(this.data.history.id, "Отклонено");
    this.snackBar.open("Заявка отклонена", "Ок", {
      panelClass: "app-snack-bar-success",
      horizontalPosition: "right",
    });
  }

  protected onNoClick() {
    this.dialogRef.close();
  }
}
