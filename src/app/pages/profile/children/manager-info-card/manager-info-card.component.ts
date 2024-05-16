import { Component, Inject, Input } from "@angular/core";
import { MaterialModule } from "@shared/modules/material/material.module";
import { CommonModule } from "@angular/common";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import HistoryModel from "@pages/profile/models/history.model";
import { InfoHistoryComponent } from "@pages/profile/children/info-history/info-history.component";
import { HistoryDialogComponent } from "@shared/components/history-dialog/history-dialog.component";
import UserModel from "@shared/models/user.model";
import { ManagerSectionDenyDialogComponent } from "@pages/profile/children/profile-manager-section/components/manager-section-deny-dialog/manager-section-deny-dialog.component";
import { HistoryService } from "@shared/services/history.service";
import { FormControl, FormGroup } from "@angular/forms";
import { iManagerData } from "@pages/profile/children/manager-info-card/interfaces/manager-data";
import { MatSnackBar } from "@angular/material/snack-bar";
import { provideNativeDateAdapter } from "@angular/material/core";

@Component({
  selector: "app-manager-info-card",
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    HistoryDialogComponent,
    ManagerSectionDenyDialogComponent,
    MatDialogModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: "./manager-info-card.component.html",
  styleUrl: "./manager-info-card.component.scss",
})
export class ManagerInfoCardComponent {
  @Input({ required: true })
  public history!: HistoryModel;
  @Input({ required: true })
  public number!: number;
  @Input({ required: true })
  public user!: UserModel;
  protected historyForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: iManagerData,
    private dialogRef: MatDialogRef<ManagerInfoCardComponent>,
    private historyService: HistoryService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.history = this.data.history;
    this.historyForm = new FormGroup({
      status: new FormControl(this.history.status),
    });
  }

  openDenyDialog() {
    this.dialog.open(ManagerSectionDenyDialogComponent, {
      data: {
        number: this.number.toString(),
      },
      backdropClass: "blur-backdrop",
    });
  }

  protected async openAcceptDialog() {
    if (!history) {
      this.historyService
        .create(
          this.historyForm.get("dateFrom")?.value.toDateString(),
          this.historyForm.get("dateTo")?.value.toDateString(),
          this.historyForm.get("type")?.value,
          this.historyForm.get("reason")?.value,
        )
        .then(() => {
          this.snackBar.open(`Заявка успешно отправлена`, "Ок", {
            horizontalPosition: "right",
            panelClass: "app-snack-bar-success",
          });
        })
        .catch(error => {
          throw new Error(error);
        });
    } else {
      await this.historyService.update(
        this.history.id,
        this.historyForm.get("status")?.value,
      );
    }
    this.dialogRef.close();
  }

  toDate(value: string) {
    return new Date(value).toLocaleDateString();
  }

  openDialog(history: HistoryModel) {
    this.dialog.open(InfoHistoryComponent, {
      data: history,
    });
  }
}
