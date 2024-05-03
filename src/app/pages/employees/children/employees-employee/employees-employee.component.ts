import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MaterialModule } from "../../../../shared/modules/material/material.module";
import { UserModel } from "../../models/user.model";
import { EmployeeInfoCardComponent } from "./components/employee-info-card/employee-info-card.component";
import { MatDialog } from "@angular/material/dialog";
import { EmployeesDeleteDialogComponent } from "../employees-delete-dialog/employees-delete-dialog.component";
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: "app-employees-employee",
  standalone: true,
  imports: [MaterialModule, EmployeeInfoCardComponent, CommonModule],
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
    console.log(this.employee.id);
    this.dialog.open(EmployeesDeleteDialogComponent, {
      data: { name: this.employee.name, id: this.employee.id },
    });
  }
}
