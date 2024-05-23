import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MaterialModule } from "@shared/modules/material/material.module";
import { CommonModule } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import HistoryModel from "@pages/profile/models/history.model";
import { InfoHistoryComponent } from "@pages/profile/children/info-history/info-history.component";
import { HistoryDialogComponent } from "@shared/components/history-dialog/history-dialog.component";
import { HistoryService } from "@shared/services/history.service";
import { ConfirmDeleteDialogComponentComponent } from "@pages/profile/children/history-info-card/components/confirm-delete-dialog-component/confirm-delete-dialog-component.component";

@Component({
  selector: "app-history-info-card",
  standalone: true,
  imports: [MaterialModule, CommonModule, HistoryDialogComponent],
  templateUrl: "./history-info-card.component.html",
  styleUrls: ["./history-info-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryInfoCardComponent {
  @Input({ required: true })
  public history!: HistoryModel;
  @Input({ required: true })
  public number!: number;

  constructor(
    private dialog: MatDialog,
    private HistoryService: HistoryService,
  ) {}

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

  deleteHistory() {
    this.dialog
      .open(ConfirmDeleteDialogComponentComponent, {
        data: { id: this.history.id },
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.HistoryService.remove(this.history.id).catch(error => {
            throw new Error(error);
          });
        }
      });
  }
}
