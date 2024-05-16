import { Component, Inject, Input } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { IManagerAcceptDialogData } from "./interfaces/manager-accept-dialog.data.interface";
import { MaterialModule } from "@shared/modules/material/material.module";
import { HistoryService } from "@shared/services/history.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { provideNativeDateAdapter } from "@angular/material/core";

@Component({
  selector: "app-manager-section-accept-dialog",
  standalone: true,
  imports: [MaterialModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: "./manager-section-accept-dialog.component.html",
  styleUrl: "./manager-section-accept-dialog.component.scss",
})
export class ManagerSectionAcceptDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ManagerSectionAcceptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IManagerAcceptDialogData,
    private historyService: HistoryService,
    private snackBar: MatSnackBar,
  ) {}

  protected async onAccept() {
    this.dialogRef.close();
    await this.historyService.update(this.data.history.id, "Принято");
    this.snackBar.open("Заявка принята", "Ок", {
      panelClass: "app-snack-bar-success",
      horizontalPosition: "right",
    });
  }

  protected onNoClick(): void {
    this.dialogRef.close();
  }
}
