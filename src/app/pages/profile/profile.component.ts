import { Component } from "@angular/core";
import { MaterialModule } from "../../shared/modules/material/material.module";
import UserModel from "../../shared/models/user.model";
import { NgIf, NgOptimizedImage } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ButtonComponent } from "../../shared/components/button/button.component";
import { IProfileData } from "../../shared/models/profile-data.interface";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [
    MaterialModule,
    NgOptimizedImage,
    FormsModule,
    ButtonComponent,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.scss",
})
export class ProfileComponent {
  public user!: UserModel;

  public dataForm: FormGroup<IProfileData> = new FormGroup<IProfileData>({
    email: new FormControl<string>("", Validators.email),
    phone: new FormControl<string>("", Validators.pattern(/[0-9]{10}/)),
  });

  constructor() {
    this.user = new UserModel(
      "Александр",
      "Рукавишников",
      "test@mail.ru",
      "Отдел разработки",
    );
  }
}
