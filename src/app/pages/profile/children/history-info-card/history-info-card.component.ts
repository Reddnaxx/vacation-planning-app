import { Component, Input } from "@angular/core";
import { MaterialModule } from "@shared/modules/material/material.module";
import { CommonModule } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import HistoryModel from "@pages/profile/models/history.model";
import { InfoHistoryComponent } from "@pages/profile/children/info-history/info-history.component";
import { HistoryDialogComponent } from "@shared/components/history-dialog/history-dialog.component";

@Component({
  selector: "app-history-info-card",
  standalone: true,
  imports: [MaterialModule, CommonModule, HistoryDialogComponent],
  templateUrl: "./history-info-card.component.html",
  styleUrls: ["./history-info-card.component.scss"],
})
export class HistoryInfoCardComponent {
  @Input({ required: true })
  public history!: HistoryModel;
  @Input({ required: true })
  public number!: number;

  constructor(private dialog: MatDialog) {}

  openEditDialog(history: HistoryModel) {
    this.dialog.open(HistoryDialogComponent, {
      data: { history },
      backdropClass: "blur-backdrop",
    });
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
