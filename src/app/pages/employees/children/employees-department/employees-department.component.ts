import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { MaterialModule } from "../../../../shared/modules/material/material.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { EmployeesEmployeeComponent } from "../employees-employee/employees-employee.component";
import { EmployeeModel } from "../../models/employee.model";
import { CommonModule } from "@angular/common";
import DepartmentModel from "../../models/department.model";
import { EmployeesService } from "../../services/employees.service";

@Component({
  selector: "app-employees-department",
  standalone: true,
  imports: [
    MaterialModule,
    MatExpansionModule,
    EmployeesEmployeeComponent,
    CommonModule,
  ],
  providers: [EmployeesService],
  templateUrl: "./employees-department.component.html",
  styleUrl: "./employees-department.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesDepartmentComponent implements OnInit {
  @Input({ required: true })
  public department!: DepartmentModel;

  public employees: EmployeeModel[] = [];

  constructor(private employeesService: EmployeesService) {}

  ngOnInit(): void {
    this.employeesService.employees$.subscribe(
      data =>
        (this.employees = data.filter(
          employee => employee.department === this.department.id,
        )),
    );
  }
}
