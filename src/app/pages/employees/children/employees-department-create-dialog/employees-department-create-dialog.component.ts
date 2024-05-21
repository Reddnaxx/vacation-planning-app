import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DepartmentsService } from "../../services/departments.service";
import { EmployeesDeleteDialogComponent } from "../employees-delete-dialog/employees-delete-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { IEmployeesDepartmentCreateForm } from "./interfaces/employees-department-create-form.interface";
import { EmployeesModule } from "../../modules/employees.module";
import { IDepartmentDeleteDialogData } from "@pages/employees/children/department-delete-dialog/interfaces/department-delete-dialog-data.interface";
import { IEmployeesDepartmentCreateData } from "@pages/employees/children/employees-department-create-dialog/interfaces/employees-department-create-data.interface";

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
    @Inject(MAT_DIALOG_DATA) public data: IEmployeesDepartmentCreateData,
    private departmentService: DepartmentsService,
    private dialogRef: MatDialogRef<EmployeesDeleteDialogComponent>,
    private snackBar: MatSnackBar,
  ) {
    this.newDepartmentForm = new FormGroup<IEmployeesDepartmentCreateForm>({
      name: new FormControl<string>("", [Validators.required]),
    });
  }

  protected async createNewDepartment(name: string) {
    this.dialogRef.close();
    const newDepartment = await this.departmentService.create(
      name,
      this.data?.parent ?? "",
    );
    this.snackBar.open(`${newDepartment.name} был успешно создан`, "Ок", {
      panelClass: "app-snack-bar-success",
      horizontalPosition: "right",
    });
  }
}
