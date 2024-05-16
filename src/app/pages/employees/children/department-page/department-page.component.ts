import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import DepartmentModel from "../../models/department.model";
import { DepartmentsService } from "../../services/departments.service";
import { BehaviorSubject, filter, Observable, switchMap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { DepartmentSectionComponent } from "./children/department-section/department-section.component";
import { EmployeesEmployeeComponent } from "../employees-employee/employees-employee.component";
import { UserService } from "@shared/services/user.service";
import { EmployeeInfoCardComponent } from "../employees-employee/components/employee-info-card/employee-info-card.component";
import { MatDialog } from "@angular/material/dialog";
import { EmployeesAddDialogComponent } from "../employees-add-dialog/employees-add-dialog.component";
import { Title } from "@angular/platform-browser";
import { EmployeesDepartmentEditDialogComponent } from "../employees-department-edit-dialog/employees-department-edit-dialog.component";
import { DepartmentDeleteDialogComponent } from "../department-delete-dialog/department-delete-dialog.component";
import { BreadCrumbService } from "@shared/services/bread-crumb.service";
import { EmployeesModule } from "@pages/employees/modules/employees.module";
import { EmployeesDepartmentCardComponent } from "../employees-department-card/employees-department-card.component";
import { EmployeesDepartmentCreateDialogComponent } from "../employees-department-create-dialog/employees-department-create-dialog.component";
import { SkeletonComponent } from "@shared/components/skeleton/skeleton.component";
import UserModel from "@shared/models/user.model";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

@Component({
  selector: "app-department",
  standalone: true,
  imports: [
    EmployeesModule,
    DepartmentSectionComponent,
    EmployeesEmployeeComponent,
    EmployeeInfoCardComponent,
    EmployeesDepartmentCardComponent,
    SkeletonComponent,
  ],
  templateUrl: "./department-page.component.html",
  styleUrl: "./department-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("show", [
      state(
        "showed",
        style({
          opacity: 1,
        }),
      ),
      transition(":enter", [
        style({
          opacity: 0,
        }),
        animate("0.2s"),
      ]),
    ]),
  ],
})
export class DepartmentPageComponent implements AfterViewInit {
  protected department$!: BehaviorSubject<DepartmentModel | null>;
  protected manager$!: BehaviorSubject<UserModel | null>;
  protected employees$!: Observable<UserModel[]>;
  protected departments$!: Observable<DepartmentModel[]>;
  protected parent$!: Observable<DepartmentModel>;

  @ViewChild("employee_search")
  private searchFieldRef!: ElementRef<HTMLInputElement>;

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
    this.manager$ = new BehaviorSubject<UserModel | null>(null);

    this.route.params
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(value => this.departmentsService.get(value["slug"])),
        filter(value => !!value),
      )
      .subscribe(value => {
        this.department$.next(value);
        this.titleService.setTitle(value.name);
        this.breadcrumbService.loadBreadCrumbs();
      });

    this.department$
      .pipe(
        filter(value => !!value),
        switchMap(value => this.userService.getById(value!.managerId)),
      )
      .subscribe(value => this.manager$.next(value));

    this.employees$ = this.department$.pipe(
      filter(value => !!value),
      switchMap(value =>
        this.departmentsService.getEmployeesByDepartment(value!.id),
      ),
    );

    this.departments$ = this.department$.pipe(
      filter(value => !!value),
      switchMap(value => this.departmentsService.getChildren(value!.id)),
    );

    this.parent$ = this.department$.pipe(
      filter(value => !!value),
      switchMap(value => this.departmentsService.getParent(value!.id)),
    );
  }

  public ngAfterViewInit(): void {
    this.searchFieldRef?.nativeElement?.focus();
  }

  protected async openDepartment(slug: string) {
    await this.router.navigate([`/employees/${slug}`]);
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

  protected openDepartmentAddDialog() {
    this.dialog.open(EmployeesDepartmentCreateDialogComponent, {
      panelClass: "app-default-dialog",
      data: { parent: this.department$.value?.id },
    });
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
