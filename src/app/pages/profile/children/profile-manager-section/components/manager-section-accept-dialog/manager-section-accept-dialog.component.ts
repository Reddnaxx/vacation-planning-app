import { Component, Inject, Input } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { IManagerAcceptDialogData } from "./interfaces/manager-accept-dialog.data.interface";
import { MaterialModule } from "@shared/modules/material/material.module";
import { HistoryService } from "@shared/services/history.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import HistoryModel from "@pages/profile/models/history.model";
import UserModel from "@shared/models/user.model";
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: "app-manager-section-accept-dialog",
  standalone: true,
  imports: [MaterialModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: "./manager-section-accept-dialog.component.html",
  styleUrl: "./manager-section-accept-dialog.component.scss",
})
export class ManagerSectionAcceptDialogComponent {
  public history!: HistoryModel;
  public number!: number;
  @Input({ required: true })
  public user!: UserModel;
  constructor(
    private dialogRef: MatDialogRef<ManagerSectionAcceptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IManagerAcceptDialogData,
    private historyService: HistoryService,
    private snackBar: MatSnackBar,
  ) {
    ({ history: this.history } = this.data);
  }

  protected async onAccept() {
    if (this.data.history) {
      await this.historyService.update(this.data.history.id, "Принять");
    }
    this.dialogRef.close();
  }
  onNoClick(): void {
    this.dialogRef.close(true);
  }
}
