import { Component, Inject } from "@angular/core";
import { MaterialModule } from "../../../../shared/modules/material/material.module";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { IEmployeesAddDialogData } from "./interfaces/employees-add-dialog-data.interface";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { IEmployeesAddDialogForm } from "./interfaces/employees-add-dialog-form.interface";
import { EmployeesService } from "../../services/employees.service";
import { BehaviorSubject } from "rxjs";
import { EmployeeModel } from "../../models/employee.model";
import { CommonModule } from "@angular/common";
import { EmployeesDeleteDialogComponent } from "../employees-delete-dialog/employees-delete-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DepartmentsService } from "../../services/departments.service";

@Component({
  selector: "app-employees-add-dialog",
  standalone: true,
  imports: [
    MaterialModule,
    MatDialogModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: "./employees-add-dialog.component.html",
  styleUrl: "./employees-add-dialog.component.scss",
})
export class EmployeesAddDialogComponent {
  protected newEmployeeForm!: FormGroup<IEmployeesAddDialogForm>;
  protected employees$!: BehaviorSubject<EmployeeModel[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IEmployeesAddDialogData,
    private employeesService: EmployeesService,
    private departmentService: DepartmentsService,
    public dialogRef: MatDialogRef<EmployeesDeleteDialogComponent>,
    public snackBar: MatSnackBar,
  ) {
    this.employees$ = new BehaviorSubject<EmployeeModel[]>([]);
    this.employeesService.employees$.subscribe(value =>
      this.employees$.next(value),
    );
    this.newEmployeeForm = new FormGroup<IEmployeesAddDialogForm>({
      email: new FormControl<string>("", [Validators.email]),
    });
  }

  protected addEmployee(email: string) {
    const department = this.departmentService.departments$
      .getValue()
      .find(d => d.id === this.data.id);
    const employee = this.employeesService.moveToDepartment(
      this.data.id,
      email,
    );
    this.dialogRef.close();
    this.snackBar.open(
      `${employee.name} добавлен в ${department?.name.toLowerCase()}`,
      "Ок",
      {
        horizontalPosition: "right",
        panelClass: "app-snack-bar-success",
      },
    );
  }
}
