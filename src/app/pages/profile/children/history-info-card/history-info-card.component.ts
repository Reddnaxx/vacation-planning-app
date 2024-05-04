import { Component, Input } from "@angular/core";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { MaterialModule } from "../../../../shared/modules/material/material.module";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { MatCardActions } from "@angular/material/card";
import HistoryModel from "../models/history.model";
import { MatIconButton } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { DialogHistoryComponent } from "../../../../shared/components/dialog-history/dialog-history.component";
import { InfoHistoryComponent } from "../../../../shared/components/info-history/info-history.component";

@Component({
  selector: "app-history-info-card",
  standalone: true,
  imports: [
    ButtonComponent,
    MatCardActions,
    MaterialModule,
    MatCardActions,
    CommonModule,
    MatCardActions,
    NgOptimizedImage,
    MatIconButton,
    DialogHistoryComponent,
    InfoHistoryComponent,
  ],
  templateUrl: "./history-info-card.component.html",
  styleUrls: ["./history-info-card.component.scss"],
})
export class HistoryInfoCardComponent {
  @Input({ required: true })
  public history!: HistoryModel;

  constructor(private dialog: MatDialog) {}

  openEditDialog(history: HistoryModel) {
    // Проверка на статус "В ожидании"
    if (history.status === "В ожидании") {
      const dialogRef = this.dialog.open(DialogHistoryComponent, {
        data: { history },
        backdropClass: "blur-backdrop",
      });
    } else {
      // Открытие диалогового окна с информацией о заявке
      this.openDialog(history);
    }
  }

  openDialog(history: HistoryModel) {
    this.dialog.open(InfoHistoryComponent, {
      data: history,
    });
  }
}
