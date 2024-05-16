import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { EmployeeInfoCardComponent } from "./components/employee-info-card/employee-info-card.component";
import { MatDialog } from "@angular/material/dialog";
import { EmployeesDeleteDialogComponent } from "../employees-delete-dialog/employees-delete-dialog.component";
import { EmployeesModule } from "@pages/employees/modules/employees.module";
import UserModel from "@shared/models/user.model";
import { EmployeesEditDialogComponent } from "@pages/employees/children/employees-edit-dialog/employees-edit-dialog.component";

@Component({
  selector: "app-employees-employee",
  standalone: true,
  imports: [EmployeeInfoCardComponent, EmployeesModule],
  templateUrl: "./employees-employee.component.html",
  styleUrl: "./employees-employee.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesEmployeeComponent {
  @Input({ required: true })
  public employee!: UserModel;

  @Input()
  public isDeleteLocked?: boolean;

  constructor(private dialog: MatDialog) {}

  protected openDeleteDialog(): void {
    this.dialog.open(EmployeesDeleteDialogComponent, {
      data: {
        name: `${this.employee.firstName} ${this.employee.lastName}`,
        id: this.employee.id,
      },
    });
  }

  protected openEditDialog(): void {
    this.dialog.open(EmployeesEditDialogComponent, {
      data: {
        employee: this.employee,
      },
    });
  }
}
