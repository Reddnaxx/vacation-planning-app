import { Component } from "@angular/core";
import { MaterialModule } from "@shared/modules/material/material.module";
import UserModel from "../../shared/models/user.model";
import { CommonModule } from "@angular/common";
import { ProfileUserSectionComponent } from "./children/profile-user-section/profile-user-section.component";
import { ProfileHistorySectionComponent } from "./children/profile-history-section/profile-history-section.component";
import { HistoryInfoCardComponent } from "./children/history-info-card/history-info-card.component";
import { BreadCrumbComponent } from "@shared/components/bread-crumb/bread-crumb.component";
import { BreadCrumbService } from "@shared/services/bread-crumb.service";
import HistoryModel from "@pages/profile/models/history.model";
import {
  ProfileManagerSectionComponent
} from '@pages/profile/children/profile-manager-section/profile-manager-section.component';

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ProfileUserSectionComponent,
    ProfileHistorySectionComponent,
    HistoryInfoCardComponent,
    BreadCrumbComponent,
    ProfileManagerSectionComponent,
  ],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.scss",
})
export class ProfileComponent {
  public user!: UserModel;
  public history!: HistoryModel[];

  constructor(private breadcrumbService: BreadCrumbService) {
    this.user = new UserModel(
      "Александр",
      "Рукавишников",
      "test@mail.ru",
      "Отдел разработки",
    );
    this.breadcrumbService.loadBreadCrumbs();
  }
}
