import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { EmployeesEmployeeComponent } from "../employees-employee/employees-employee.component";
import { EmployeeModel } from "../../models/employee.model";
import DepartmentModel from "../../models/department.model";
import { BehaviorSubject, Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { EmployeesDepartmentEditDialogComponent } from "../employees-department-edit-dialog/employees-department-edit-dialog.component";
import { EmployeesModule } from "../../modules/employees.module";
import { EmployeesAddDialogComponent } from "../employees-add-dialog/employees-add-dialog.component";
import { DepartmentsService } from "../../services/departments.service";

@Component({
  selector: "app-employees-department",
  standalone: true,
  imports: [EmployeesModule, EmployeesEmployeeComponent],
  templateUrl: "./employees-department.component.html",
  styleUrl: "./employees-department.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesDepartmentComponent implements OnInit {
  @Input({ required: true })
  public department!: DepartmentModel;

  public employees$!: Observable<EmployeeModel[]>;

  constructor(
    private departmentService: DepartmentsService,
    private dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    this.employees$ = this.departmentService.getEmployees(this.department.id);
  }

  protected openDepartmentEditDialog() {
    this.dialog.open(EmployeesDepartmentEditDialogComponent, {
      panelClass: "app-default-dialog",
      data: { department: this.department },
    });
  }

  protected openAddEmployeeDialog() {
    this.dialog.open(EmployeesAddDialogComponent, {
      panelClass: "app-default-dialog",
      data: { id: this.department.id },
    });
  }

  protected readonly parent = parent;
}
