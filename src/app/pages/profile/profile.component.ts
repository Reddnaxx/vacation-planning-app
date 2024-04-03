import { Component } from "@angular/core";
import { MaterialModule } from "../../shared/modules/material/material.module";
import UserModel from "../../shared/models/user.model";
import { NgOptimizedImage } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [MaterialModule, NgOptimizedImage, FormsModule],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.scss",
})
export class ProfileComponent {
  public user!: UserModel;

  constructor() {
    this.user = new UserModel(
      "Александр",
      "Рукавишников",
      "test@mail.ru",
      "Отдел разработки",
    );
  }
}
