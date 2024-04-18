import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../../shared/modules/material/material.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { EmployeesDepartmentComponent } from "./children/employees-department/employees-department.component";
import DepartmentModel from "./models/department.model";
import { DepartmentsService } from "./services/departments.service";
import { BehaviorSubject } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { EmployeesDepartmentCreateDialogComponent } from "./children/employees-department-create-dialog/employees-department-create-dialog.component";
import { FilterPipe } from "../../shared/pipes/filter.pipe";

@Component({
  selector: "app-employees",
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    MatExpansionModule,
    EmployeesDepartmentComponent,
    FilterPipe,
  ],
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
