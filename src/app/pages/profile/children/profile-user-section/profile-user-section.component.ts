import { Component, Input, OnInit } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { MaterialModule } from "../../../../shared/modules/material/material.module";
import UserModel from "@shared/models/user.model";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { IProfileData } from "@shared/models/profile-data.interface";
import { PhoneMaskDirective } from "@shared/directives/phone-mask.directive";
import { DepartmentsService } from "@pages/employees/services/departments.service";
import DepartmentModel from "@pages/employees/models/department.model";
import { filter, map, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { UserService } from "@shared/services/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ReactiveFormsModule } from "@angular/forms";
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
export class ProfileUserSectionComponent implements OnInit {
  @Input({ required: true })
  public user!: UserModel;

  protected department$!: Observable<DepartmentModel | undefined>;

  protected dataForm!: FormGroup<IProfileData>;

  constructor(
    private departmentsService: DepartmentsService,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) {
    this.department$ = this.departmentsService.departments$.pipe(
      filter(departments =>
        departments.some(department =>
          this.user.department.includes(department.id),
        ),
      ),
      map(departments => departments[0]),
    );
  }

  public ngOnInit() {
    this.dataForm = new FormGroup<IProfileData>({
      email: new FormControl<string>(this.user.email || "", [
        Validators.email,
        Validators.required,
      ]),
      phone: new FormControl<string>(this.user.phone || "", [
        Validators.required,
        Validators.minLength(18),
      ]),
    });
  }

  protected async editUser() {
    await this.userService.edit(this.user.id, {
      email: this.dataForm.value.email ?? undefined,
      phone: this.dataForm.value.phone ?? undefined,
    });
    this.snackBar.open("Профиль успешно изменен", "Ок", {
      horizontalPosition: "right",
      panelClass: "app-snack-bar-success",
    });
    this.dataForm.reset(this.dataForm.value);
    
  protected get data(): ProfileEditModel {
    return this.dataForm.toModel();
  }
}
