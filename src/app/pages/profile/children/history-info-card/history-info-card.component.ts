import { Component, Input } from "@angular/core";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { MaterialModule } from "../../../../shared/modules/material/material.module";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { MatCardActions } from "@angular/material/card";
import HistoryModel from "../models/history.model";
import { MatIconButton } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { DialogHistoryComponent } from "../../../../shared/components/dialog-history/dialog-history.component";

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
  ],
  templateUrl: "./history-info-card.component.html",
  styleUrl: "./history-info-card.component.scss",
})
export class HistoryInfoCardComponent {
  @Input({ required: true })
  public history!: HistoryModel;

  constructor(private dialog: MatDialog) {}

  openEditDialog(history: HistoryModel) {
    const dialogRef = this.dialog.open(DialogHistoryComponent, {
      data: { history },
      backdropClass: 'blur-backdrop'});
  }
}
