import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MaterialModule } from "@shared/modules/material/material.module";
import { CommonModule } from "@angular/common";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import HistoryModel from "@pages/profile/models/history.model";
import { InfoHistoryComponent } from "@pages/profile/children/info-history/info-history.component";
import { HistoryDialogComponent } from "@shared/components/history-dialog/history-dialog.component";
import UserModel from "@shared/models/user.model";
import { ManagerSectionDenyDialogComponent } from "@pages/profile/children/profile-manager-section/components/manager-section-deny-dialog/manager-section-deny-dialog.component";
import { provideNativeDateAdapter } from "@angular/material/core";
import { ManagerSectionAcceptDialogComponent } from "@pages/profile/children/profile-manager-section/components/manager-section-accept-dialog/manager-section-accept-dialog.component";

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerInfoCardComponent {
  @Input({ required: true })
  public history!: HistoryModel;
  @Input({ required: true })
  public number!: number;
  @Input({ required: true })
  public user!: UserModel;

  constructor(private dialog: MatDialog) {}

  protected openDenyDialog() {
    this.dialog.open(ManagerSectionDenyDialogComponent, {
      data: {
        number: this.number.toString(),
        history: this.history,
      },
      backdropClass: "blur-backdrop",
    });
  }

  protected async openAcceptDialog() {
    this.dialog.open(ManagerSectionAcceptDialogComponent, {
      data: {
        number: this.number.toString(),
        history: this.history,
      },
      backdropClass: "blur-backdrop",
    });
  }

  protected toDate(value: string) {
    return new Date(value).toLocaleDateString();
  }

  protected openInfoDialog(history: HistoryModel) {
    this.dialog.open(InfoHistoryComponent, {
      data: history,
    });
  }
}
