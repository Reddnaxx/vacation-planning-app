import { Component, NgModule } from "@angular/core";
import { MaterialModule } from "../../shared/modules/material/material.module";
import UserModel from "../../shared/models/user.model";
import { NgIf, NgOptimizedImage } from "@angular/common";
import { ButtonComponent } from "../../shared/components/button/button.component";
import { ProfileUserSectionComponent } from "./children/profile-user-section/profile-user-section.component";
import { ProfileHistorySectionComponent } from "./children/profile-history-section/profile-history-section.component";
import { HistoryInfoCardComponent } from "./children/history-info-card/history-info-card.component";
import HistoryModel from "./children/models/history.model";
import { BreadCrumbComponent } from "@shared/components/bread-crumb/bread-crumb.component";
import { BreadCrumbService } from "@shared/services/bread-crumb.service";


@Component({
  selector: "app-profile",
  standalone: true,
  imports: [
    MaterialModule,
    NgOptimizedImage,
    ButtonComponent,
    NgIf,
    ProfileUserSectionComponent,
    ProfileHistorySectionComponent,
    HistoryInfoCardComponent,
    BreadCrumbComponent,
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
    this.history = [new HistoryModel(
      "Заявка №1",
      "16 Февраля" ,
      "17 Февраля 2023г",
      "Выполнено",
      "Отгул",
      "По семейным",
      "5"),
      new HistoryModel(
        "Заявка №2",
        "16 Февраля" ,
        "16 Июня 2023г",
        "Выполнено",
        "Отгул",
        "По семейным",
        "10"),
      new HistoryModel(
        "Заявка №3",
        "1 Сентября" ,
        "31 Сентября 2024г",
        "Подтверждено",
        "Отгул",
        "По семейным",
        "6"),
      new HistoryModel(
        "Заявка №4",
        "1 Декабря" ,
        "10 Января 2024г",
        "Отклонено",
        "Отгул",
        "По семейным",
        "7"),
      new HistoryModel(
        "Заявка №5",
        "29 Марта" ,
        "4 Апреля 2024г",
        "В ожидании",
        "Отгул",
        "По семейным",
        "11")]
  }
}
