import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../../shared/modules/material/material.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { EmployeesDepartmentComponent } from "./children/employees-department/employees-department.component";
import DepartmentModel from "./models/department.model";
import { DepartmentsService } from "./services/departments.service";

@Component({
  selector: "app-employees",
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    MatExpansionModule,
    EmployeesDepartmentComponent,
  ],
  providers: [DepartmentsService],
  templateUrl: "./employees.component.html",
  styleUrl: "./employees.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesComponent {
  public departments: DepartmentModel[] = [];

  constructor(private departmentsService: DepartmentsService) {
    this.departmentsService.departments$.subscribe(
      data => (this.departments = data),
    );
  }
}
