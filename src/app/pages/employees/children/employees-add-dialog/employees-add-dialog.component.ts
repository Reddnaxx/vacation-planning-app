import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { IEmployeesAddDialogData } from "./interfaces/employees-add-dialog-data.interface";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IEmployeesAddDialogForm } from "./interfaces/employees-add-dialog-form.interface";
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from "../../models/user.model";
import { EmployeesDeleteDialogComponent } from "../employees-delete-dialog/employees-delete-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DepartmentsService } from "../../services/departments.service";
import { EmployeesModule } from "../../modules/employees.module";

@Component({
  selector: "app-employees-add-dialog",
  standalone: true,
  imports: [EmployeesModule],
  templateUrl: "./employees-add-dialog.component.html",
  styleUrl: "./employees-add-dialog.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesAddDialogComponent {
  protected newEmployeeForm!: FormGroup<IEmployeesAddDialogForm>;
  protected employees$!: Observable<UserModel[]>;

  protected get name() {
    return this.newEmployeeForm.controls.name;
  }

  protected get email() {
    return this.newEmployeeForm.controls.email;
  }

  protected get phone() {
    return this.newEmployeeForm.controls.phone;
  }

  protected get password() {
    return this.newEmployeeForm.controls.password;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IEmployeesAddDialogData,
    private departmentService: DepartmentsService,
    public dialogRef: MatDialogRef<EmployeesDeleteDialogComponent>,
    public snackBar: MatSnackBar,
  ) {
    this.newEmployeeForm = new FormGroup<IEmployeesAddDialogForm>({
      name: new FormControl<string>("", [Validators.required]),
      phone: new FormControl<string>("", [Validators.required]),
      email: new FormControl<string>("", [
        Validators.email,
        Validators.required,
      ]),
      password: new FormControl<string>("", [Validators.required]),
    });
    this.employees$ = this.departmentService.getAllEmployees();
  }

  protected async createEmployee(
    name: string | null,
    phone: string | null,
    email: string | null,
    password: string | null,
  ) {
    this.dialogRef.close();
    await this.departmentService.createEmployee(
      this.data.id,
      name!,
      phone!,
      email!,
      password!,
    );
    this.snackBar.open(`${name} был успешно добавлен`, "Ок", {
      horizontalPosition: "right",
      panelClass: "app-snack-bar-success",
    });
  }
}
