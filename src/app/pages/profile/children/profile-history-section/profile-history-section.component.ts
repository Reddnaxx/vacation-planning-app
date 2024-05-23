import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MaterialModule } from "@shared/modules/material/material.module";
import { CommonModule } from "@angular/common";
import { MatCardActions } from "@angular/material/card";
import { HistoryInfoCardComponent } from "../history-info-card/history-info-card.component";
import HistoryModel from "@pages/profile/models/history.model";
import { MatDialog } from "@angular/material/dialog";
import { HistoryDialogComponent } from "@shared/components/history-dialog/history-dialog.component";
import { HistoryService } from "@shared/services/history.service";
import { Observable } from "rxjs";
import UserModel from "@shared/models/user.model";
import { LoaderComponent } from "@shared/components/loader/loader.component";

@Component({
  selector: "app-profile-history-section",
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    MatCardActions,
    HistoryInfoCardComponent,
    LoaderComponent,
  ],
  templateUrl: "./profile-history-section.component.html",
  styleUrl: "./profile-history-section.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileHistorySectionComponent {
  protected history$!: Observable<HistoryModel[]>;
  public user!: UserModel;

  constructor(
    private dialog: MatDialog,
    private historyService: HistoryService,
  ) {
    this.history$ = this.historyService.getUserHistory();
  }

  openDialog() {
    this.dialog.open(HistoryDialogComponent, {
      backdropClass: "blur-backdrop",
    });
  }
}
