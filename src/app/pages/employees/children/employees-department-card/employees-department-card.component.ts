import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Input,
  OnInit,
} from "@angular/core";
import { EmployeesEmployeeComponent } from "../employees-employee/employees-employee.component";
import { UserModel } from "../../models/user.model";
import DepartmentModel from "../../models/department.model";
import { Observable } from "rxjs";
import { EmployeesModule } from "../../modules/employees.module";
import { DepartmentsService } from "../../services/departments.service";
import { MatStepper } from "@angular/material/stepper";
import { LoaderComponent } from "@shared/components/loader/loader.component";
import { EmployeeDepartmentInfoCardComponent } from "./components/employee-department-info-card/employee-department-info-card.component";
import { UserService } from "@shared/services/user.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";
import { SkeletonComponent } from '@shared/components/skeleton/skeleton.component';

@Component({
  selector: "app-department-card",
  standalone: true,
  imports: [
    EmployeesModule,
    EmployeesEmployeeComponent,
    MatStepper,
    LoaderComponent,
    EmployeeDepartmentInfoCardComponent,
    SkeletonComponent,
  ],
  templateUrl: "./employees-department-card.component.html",
  styleUrl: "./employees-department-card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesDepartmentCardComponent implements OnInit {
  @Input({ required: true })
  public department!: DepartmentModel;

  protected employees$!: Observable<UserModel[]>;
  protected manager!: UserModel;

  constructor(
    private departmentService: DepartmentsService,
    private userService: UserService,
    private destroyRef: DestroyRef,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.employees$ = this.departmentService.getEmployeesByDepartment(this.department.id);
    this.userService
      .getById(this.department.managerId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => (this.manager = value!));
  }

  protected async navigateToDepartmentPage() {
    await this.router.navigate([`employees/${this.department.slug}`]);
  }

  protected readonly parent = parent;
}
