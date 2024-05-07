import { ChangeDetectionStrategy, Component, DestroyRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import DepartmentModel from "../../models/department.model";
import { DepartmentsService } from "../../services/departments.service";
import { BehaviorSubject, filter, Observable, switchMap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { DepartmentSectionComponent } from "./children/department-section/department-section.component";
import { EmployeesEmployeeComponent } from "../employees-employee/employees-employee.component";
import { UserModel } from "@pages/employees/models/user.model";
import { UserService } from "@shared/services/user.service";
import { EmployeeInfoCardComponent } from "../employees-employee/components/employee-info-card/employee-info-card.component";
import { MatDialog } from "@angular/material/dialog";
import { EmployeesAddDialogComponent } from "../employees-add-dialog/employees-add-dialog.component";
import { Title } from "@angular/platform-browser";
import { EmployeesDepartmentEditDialogComponent } from "@pages/employees/children/employees-department-edit-dialog/employees-department-edit-dialog.component";
import { DepartmentDeleteDialogComponent } from "@pages/employees/children/department-delete-dialog/department-delete-dialog.component";
import { BreadCrumbService } from "@shared/services/bread-crumb.service";
import { EmployeesModule } from "@pages/employees/modules/employees.module";

@Component({
  selector: "app-department",
  standalone: true,
  imports: [
    EmployeesModule,
    DepartmentSectionComponent,
    EmployeesEmployeeComponent,
    EmployeeInfoCardComponent,
  ],
  templateUrl: "./department-page.component.html",
  styleUrl: "./department-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentPageComponent {
  protected department$!: BehaviorSubject<DepartmentModel | null>;
  protected manager$!: Observable<UserModel>;
  protected employees$!: Observable<UserModel[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departmentsService: DepartmentsService,
    private userService: UserService,
    private destroyRef: DestroyRef,
    private dialog: MatDialog,
    private titleService: Title,
    private breadcrumbService: BreadCrumbService,
  ) {
    this.department$ = new BehaviorSubject<DepartmentModel | null>(null);

    this.route.params
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(value => this.departmentsService.get(value["slug"])),
      )
      .subscribe(value => {
        this.department$.next(value);
        this.titleService.setTitle(value.name);
      });

    this.manager$ = this.department$.pipe(
      filter(value => !!value),
      switchMap(value => this.userService.getById(value!.managerId)),
    );

    this.employees$ = this.department$.pipe(
      filter(value => !!value),
      switchMap(value => this.departmentsService.getEmployees(value!.id)),
    );
    this.breadcrumbService.loadBreadCrumbs();
  }

  protected openEmployeeAddDialog() {
    this.dialog.open(EmployeesAddDialogComponent, {
      panelClass: "app-default-dialog",
      data: { id: this.department$.value?.id },
    });
  }

  protected async goBack() {
    await this.router.navigate(["/employees"]);
  }

  protected openDepartmentEditDialog() {
    this.dialog.open(EmployeesDepartmentEditDialogComponent, {
      panelClass: "app-default-dialog",
      data: { department: this.department$.value },
    });
  }

  protected openDepartmentDeleteDialog() {
    this.dialog.open(DepartmentDeleteDialogComponent, {
      panelClass: "app-default-dialog",
      data: {
        name: this.department$.value?.name,
        id: this.department$.value?.id,
      },
    });
  }
}
