import { Component, Input } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { MaterialModule } from "../../../../shared/modules/material/material.module";
import UserModel from "../../../../shared/models/user.model";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { IProfileData } from "@shared/models/profile-data.interface";
import { PhoneMaskDirective } from '@shared/directives/phone-mask.directive';

@Component({
  selector: "app-profile-user-section",
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    PhoneMaskDirective,
  ],
  templateUrl: "./profile-user-section.component.html",
  styleUrl: "./profile-user-section.component.scss",
})
export class ProfileUserSectionComponent {
  @Input({ required: true })
  public user!: UserModel;

  public dataForm: FormGroup<IProfileData> = new FormGroup<IProfileData>({
    email: new FormControl<string>("", [Validators.email, Validators.required]),
    phone: new FormControl<string>("", [Validators.required]),
  });
}
