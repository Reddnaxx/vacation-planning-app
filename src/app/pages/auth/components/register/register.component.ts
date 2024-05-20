import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth-service/auth.service";
import UserModel from "@shared/models/user.model";
import { CustomValidators } from "@pages/auth/_helpers/custom-validators";
import DepartmentModel from "@pages/employees/models/department.model";
import { DepartmentsService } from "@pages/employees/services/departments.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  form: FormGroup = new FormGroup(
    {
      email: new FormControl("", [Validators.required, Validators.email]),
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      surname: new FormControl(""),
      password: new FormControl("", [Validators.required]),
      passwordConfirm: new FormControl("", [Validators.required]),
      department: new FormControl("", [Validators.required]),
    },
    { validators: CustomValidators.passwordsMatching },
  );

  protected departments$!: Observable<DepartmentModel[]>;

  constructor(
    private authService: AuthService,
    private departmentsService: DepartmentsService,
    private router: Router,
  ) {
    this.departments$ = this.departmentsService.departments$;
  }

  onRegister() {
    if (this.form.invalid) {
      return;
    }

    const user: UserModel = {
      email: this.form.value.email,
      password: this.form.value.password,
      firstName: this.form.value.firstName,
      surname: this.form.value.surname,
      lastName: this.form.value.lastName,
      department: this.form.value.department,
      isActive: true,
      id: "",
      uid: "",
      role: "employee",
    };

    this.authService.register(user).then(
      () => {
        this.router.navigate(["../profile"]);
      },
      error => {
        throw new Error(error);
      },
    );
  }

  get email(): FormControl {
    return this.form.get("email") as FormControl;
  }

  get firstName(): FormControl {
    return this.form.get("firstName") as FormControl;
  }

  get lastName(): FormControl {
    return this.form.get("lastName") as FormControl;
  }

  get department(): FormControl {
    return this.form.get("department") as FormControl;
  }

  get password(): FormControl {
    return this.form.get("password") as FormControl;
  }

  get passwordConfirm(): FormControl {
    return this.form.get("passwordConfirm") as FormControl;

  }
}
