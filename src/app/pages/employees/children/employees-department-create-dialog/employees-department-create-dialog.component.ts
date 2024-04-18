import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MaterialModule } from "../../../../shared/modules/material/material.module";
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

  protected createNewDepartment(name: string): void {
    const newDepartment = this.departmentService.create(name);
    this.dialogRef.close();
    this.snackBar.open(`${newDepartment.name} был успешно создан`, "Ок", {
      panelClass: "app-snack-bar-success",
      horizontalPosition: "right",
    });
  }
}
