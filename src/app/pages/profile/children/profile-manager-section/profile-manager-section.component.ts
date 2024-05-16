import { Component, Input } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ManagerInfoCardComponent } from "@pages/profile/children/manager-info-card/manager-info-card.component";
import { MatCardActions } from "@angular/material/card";
import { Observable } from "rxjs";
import HistoryModel from "@pages/profile/models/history.model";
import { HistoryService } from "@shared/services/history.service";
import { MaterialModule } from "@shared/modules/material/material.module";
import UserModel from '@shared/models/user.model';

@Component({
  selector: "app-profile-manager-section",
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    MatCardActions,
    ManagerInfoCardComponent,
  ],
  templateUrl: "./profile-manager-section.component.html",
  styleUrl: "./profile-manager-section.component.scss",
})
export class ProfileManagerSectionComponent {
  protected history$!: Observable<HistoryModel[]>;
  @Input({ required: true })
  public user!: UserModel;

  constructor(
    private historyService: HistoryService,
  ) {
    this.history$ = this.historyService.history$;
  }
}
