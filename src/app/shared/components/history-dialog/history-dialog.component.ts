import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { IcalendarButtonData } from "./Interfaces/calendar-button-data";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import HistoryModel from "@pages/profile/models/history.model";
import { MaterialModule } from "@shared/modules/material/material.module";
import { timeOffTypes } from "@shared/components/history-dialog/data/time-off-types";
import { HistoryService } from "@shared/services/history.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-calendar-button",
  standalone: true,
  imports: [
    MaterialModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: "./history-dialog.component.html",
  styleUrls: ["./history-dialog.component.scss"],
})
export class HistoryDialogComponent {
  public history!: HistoryModel;
  protected historyForm!: FormGroup;

  protected readonly timeOffTypes = timeOffTypes;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IcalendarButtonData,
    private dialogRef: MatDialogRef<HistoryDialogComponent>,
    private historyService: HistoryService,
    private snackBar: MatSnackBar,
  ) {
    this.history = this.data.history;
    this.historyForm = new FormGroup({
      type: new FormControl(this.history.type),
      reason: new FormControl(this.history.reason),
      dateFrom: new FormControl<Date | null>(new Date(this.history.dateStart)),
      dateTo: new FormControl<Date | null>(new Date(this.history.dateEnd)),
    });
  }

  protected async saveChanges() {
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
      await this.historyService.edit(
        this.history.id,
        this.historyForm.get("reason")?.value,
        this.historyForm.get("type")?.value,
        this.historyForm.get("dateFrom")?.value.toDateString(),
        this.historyForm.get("dateTo")?.value.toDateString(),
      );
    }
    this.dialogRef.close();
  }
}
