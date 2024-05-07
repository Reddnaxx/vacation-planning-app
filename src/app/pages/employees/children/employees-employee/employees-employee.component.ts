import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { UserModel } from "../../models/user.model";
import { EmployeeInfoCardComponent } from "./components/employee-info-card/employee-info-card.component";
import { MatDialog } from "@angular/material/dialog";
import { EmployeesDeleteDialogComponent } from "../employees-delete-dialog/employees-delete-dialog.component";
import { EmployeesModule } from "@pages/employees/modules/employees.module";

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
      data: { name: this.employee.name, id: this.employee.id },
    });
  }
}
