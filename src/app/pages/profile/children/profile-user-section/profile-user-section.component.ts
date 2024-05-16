import { Component, Input } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { MaterialModule } from "@shared/modules/material/material.module";
import UserModel from "@shared/models/user.model";
import { ReactiveFormsModule } from "@angular/forms";
import { PhoneMaskDirective } from "@shared/directives/phone-mask.directive";
import { ProfileUserEditFormViewModel } from "@pages/profile/view-models/profile-user-edit-form.view-model";
import { ProfileEditModel } from '@pages/profile/models/profile-edit.model';

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

  protected get data(): ProfileEditModel {
    return this.dataForm.toModel();
  }

  protected dataForm: ProfileUserEditFormViewModel;

  constructor() {
    this.dataForm = new ProfileUserEditFormViewModel();
  }
}
