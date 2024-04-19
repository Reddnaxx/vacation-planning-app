import { ChangeDetectionStrategy, Component } from "@angular/core";
import DepartmentModel from "./models/department.model";
import { DepartmentsService } from "./services/departments.service";
import { BehaviorSubject } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { EmployeesDepartmentCreateDialogComponent } from "./children/employees-department-create-dialog/employees-department-create-dialog.component";
import { EmployeesModule } from "./modules/employees.module";
import { EmployeesDepartmentComponent } from "./children/employees-department/employees-department.component";

@Component({
  selector: "app-employees",
  standalone: true,
  imports: [EmployeesModule, EmployeesDepartmentComponent],
  templateUrl: "./employees.component.html",
  styleUrl: "./employees.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesComponent {
  public departments$!: BehaviorSubject<DepartmentModel[]>;

  constructor(
    private departmentsService: DepartmentsService,
    private dialog: MatDialog,
  ) {
    this.departments$ = new BehaviorSubject<DepartmentModel[]>([]);
    this.departmentsService.departments$.subscribe(value => {
      this.departments$.next(value);
    });
  }

  protected openDepartmentCreateDialog() {
    this.dialog.open(EmployeesDepartmentCreateDialogComponent, {
      panelClass: "app-default-dialog",
    });
  }
}
