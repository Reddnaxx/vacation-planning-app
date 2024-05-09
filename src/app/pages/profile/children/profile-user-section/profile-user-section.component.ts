import { Component, Input } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { MaterialModule } from "../../../../shared/modules/material/material.module";
import { UserModel } from "@shared/models/user.model";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { IProfileData } from "../../../../shared/models/profile-data.interface";
import { ButtonComponent } from "../../../../shared/components/button/button.component";

@Component({
  selector: "app-profile-user-section",
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: "./profile-user-section.component.html",
  styleUrl: "./profile-user-section.component.scss",
})
export class ProfileUserSectionComponent {
  @Input({required: true})
  public user!: UserModel;

  public dataForm: FormGroup<IProfileData> = new FormGroup<IProfileData>({
    email: new FormControl<string>("", Validators.email),
    phone: new FormControl<string>("", Validators.pattern(/[0-9]{10}/)),
  });
}
