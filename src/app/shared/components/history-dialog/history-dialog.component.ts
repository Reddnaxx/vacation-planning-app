import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { IcalendarButtonData } from "./Interfaces/calendar-button-data";
import { provideNativeDateAdapter } from "@angular/material/core";
import { DateRange, MatDatepickerModule } from "@angular/material/datepicker";
import HistoryModel from "@pages/profile/models/history.model";
import { MaterialModule } from "@shared/modules/material/material.module";
import { timeOffTypes } from "@shared/components/history-dialog/data/time-off-types";

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
  ) {
    this.history = this.data.history;
    this.historyForm = new FormGroup({
      type: new FormControl(this.history.type),
      reason: new FormControl(this.history.content),
      dateFrom: new FormControl(this.history.dateStart),
      dateTo: new FormControl(this.history.dateEnd),
    });
  }

  protected saveChanges() {
    this.history.type = this.historyForm.get("type")?.value;
    this.history.content = this.historyForm.get("content")?.value;
    this.history.dateStart = this.historyForm.get("dateFrom")?.value;
    this.history.dateEnd = this.historyForm.get("dateTo")?.value;
    this.dialogRef.close();
  }
}
