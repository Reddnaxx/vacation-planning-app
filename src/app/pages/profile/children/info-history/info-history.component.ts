import { Component, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";
import HistoryModel from "@pages/profile/models/history.model";

@Component({
  selector: "app-info-history",
  templateUrl: "./info-history.component.html",
  styleUrls: ["./info-history.component.scss"],
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatDialogClose,
    MatButton,
  ],
})
export class InfoHistoryComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: HistoryModel) {}
}
