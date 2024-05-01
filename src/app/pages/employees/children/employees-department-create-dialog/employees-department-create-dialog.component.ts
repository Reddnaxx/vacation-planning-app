import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { DepartmentsService } from "../../services/departments.service";
import { EmployeesDeleteDialogComponent } from "../employees-delete-dialog/employees-delete-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { IEmployeesDepartmentCreateForm } from "./interfaces/employees-department-create-form.interface";
import { EmployeesModule } from "../../modules/employees.module";

@Component({
  selector: "app-employees-department-create-dialog",
  standalone: true,
  imports: [EmployeesModule],
  templateUrl: "./employees-department-create-dialog.component.html",
  styleUrl: "./employees-department-create-dialog.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesDepartmentCreateDialogComponent {
  protected newDepartmentForm: FormGroup<IEmployeesDepartmentCreateForm>;

  constructor(
    private departmentService: DepartmentsService,
    private dialogRef: MatDialogRef<EmployeesDeleteDialogComponent>,
    private snackBar: MatSnackBar,
  ) {
    this.newDepartmentForm = new FormGroup<IEmployeesDepartmentCreateForm>({
      name: new FormControl<string>("", [Validators.required]),
    });
  }

  protected async createNewDepartment(name: string) {
    const newDepartment = await this.departmentService.create(name);
    this.dialogRef.close();
    this.snackBar.open(`${newDepartment.name} был успешно создан`, "Ок", {
      panelClass: "app-snack-bar-success",
      horizontalPosition: "right",
    });
  }
}
