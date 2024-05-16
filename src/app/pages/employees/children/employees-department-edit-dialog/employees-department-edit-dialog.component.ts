import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import DepartmentModel from "../../models/department.model";
import { DepartmentsService } from "../../services/departments.service";
import { IEmployeesDepartmentEditData } from "./interfaces/employees-department-edit-data.interface";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IEmployeesDepartmentEditForm } from "./interfaces/employees-department-edit-form.interface";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EmployeesModule } from "../../modules/employees.module";

@Component({
  selector: "app-employees-department-edit-dialog",
  standalone: true,
  imports: [EmployeesModule],
  templateUrl: "./employees-department-edit-dialog.component.html",
  styleUrl: "./employees-department-edit-dialog.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesDepartmentEditDialogComponent {
  protected department: DepartmentModel;
  protected departmentEditForm: FormGroup<IEmployeesDepartmentEditForm>;

  constructor(
    private departmentsService: DepartmentsService,
    private dialogRef: MatDialogRef<EmployeesDepartmentEditDialogComponent>,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: IEmployeesDepartmentEditData,
  ) {
    this.department = this.data.department;
    this.departmentEditForm = new FormGroup<IEmployeesDepartmentEditForm>({
      name: new FormControl<string>("", [Validators.required]),
    });
    this.departmentEditForm.controls.name.setValue(this.department.name);
  }

  protected async updateDepartment(name: string) {
    this.dialogRef.close();
    await this.departmentsService.edit(this.department.id, name);
    this.snackbar.open(`${this.department.name} успешно изменен`, "Ок", {
      horizontalPosition: "right",
      panelClass: "app-snack-bar-success",
    });
  }
}
