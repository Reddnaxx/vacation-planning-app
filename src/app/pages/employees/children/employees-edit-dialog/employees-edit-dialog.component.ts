import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EmployeesDeleteDialogComponent } from "../employees-delete-dialog/employees-delete-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DepartmentsService } from "../../services/departments.service";
import { EmployeesModule } from "../../modules/employees.module";
import { PhoneMaskDirective } from "@shared/directives/phone-mask.directive";
import { IEmployeesEditDialogForm } from "./interfaces/employees-edit-dialog-form.interface";
import { IEmployeesEditDialogData } from "./interfaces/employees-edit-dialog-data.interface";

@Component({
  selector: "app-employees-edit-dialog",
  standalone: true,
  imports: [EmployeesModule, PhoneMaskDirective],
  templateUrl: "./employees-edit-dialog.component.html",
  styleUrl: "./employees-edit-dialog.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesEditDialogComponent implements OnInit {
  protected newEmployeeForm!: FormGroup<IEmployeesEditDialogForm>;

  protected get firstName() {
    return this.newEmployeeForm.controls.firstName;
  }

  protected get surname() {
    return this.newEmployeeForm.controls.surname;
  }

  protected get lastName() {
    return this.newEmployeeForm.controls.lastName;
  }

  protected get phone() {
    return this.newEmployeeForm.controls.phone;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IEmployeesEditDialogData,
    private departmentService: DepartmentsService,
    public dialogRef: MatDialogRef<EmployeesDeleteDialogComponent>,
    public snackBar: MatSnackBar,
  ) {}

  private get employee() {
    return this.data.employee;
  }

  public ngOnInit() {
    this.newEmployeeForm = new FormGroup<IEmployeesEditDialogForm>({
      firstName: new FormControl<string>(this.employee.firstName, [
        Validators.required,
      ]),
      lastName: new FormControl<string>(this.employee.lastName, [
        Validators.required,
      ]),
      surname: new FormControl<string>(this.employee.surname),
      phone: new FormControl<string>(this.employee.phone || "", [
        Validators.required,
      ]),
    });
  }

  protected async editEmployee() {
    this.dialogRef.close();
    await this.departmentService.editEmployee(this.employee.id, {
      lastName: this.lastName.value || "",
      surname: this.surname.value || "",
      firstName: this.firstName.value || "",
      phone: this.phone.value || "",
    });
    this.snackBar.open(
      `${this.employee.firstName} ${this.employee.lastName} ${this.employee.surname} был успешно изменен`,
      "Ок",
      {
        horizontalPosition: "right",
        panelClass: "app-snack-bar-success",
      },
    );
  }
}
