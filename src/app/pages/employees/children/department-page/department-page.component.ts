import { Component, DestroyRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import DepartmentModel from "../../models/department.model";
import { DepartmentsService } from "../../services/departments.service";
import { BehaviorSubject, filter, Observable, switchMap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CommonModule } from "@angular/common";
import { LoaderComponent } from "@shared/components/loader/loader.component";
import { MaterialModule } from "@shared/modules/material/material.module";
import { DepartmentSectionComponent } from "./children/department-section/department-section.component";
import { EmployeesEmployeeComponent } from "../employees-employee/employees-employee.component";
import { UserModel } from "@pages/employees/models/user.model";
import { UserService } from "@shared/services/user.service";
import { EmployeeInfoCardComponent } from "../employees-employee/components/employee-info-card/employee-info-card.component";
import { MatDialog } from "@angular/material/dialog";
import { EmployeesAddDialogComponent } from "../employees-add-dialog/employees-add-dialog.component";
import { FilterPipe } from '@shared/pipes/filter.pipe';

@Component({
  selector: "app-department",
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    MaterialModule,
    DepartmentSectionComponent,
    EmployeesEmployeeComponent,
    EmployeeInfoCardComponent,
    FilterPipe,
  ],
  templateUrl: "./department-page.component.html",
  styleUrl: "./department-page.component.scss",
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
  ) {
    this.department$ = new BehaviorSubject<DepartmentModel | null>(null);

    this.route.params
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(value => this.departmentsService.get(value["slug"])),
      )
      .subscribe({
        next: value => this.department$.next(value),
      });

    this.manager$ = this.department$.pipe(
      filter(value => !!value),
      switchMap(value => this.userService.getById(value!.managerId)),
    );

    this.employees$ = this.department$.pipe(
      filter(value => !!value),
      switchMap(value => this.departmentsService.getEmployees(value!.id)),
    );
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
}
