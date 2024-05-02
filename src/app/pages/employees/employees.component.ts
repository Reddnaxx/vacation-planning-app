import { ChangeDetectionStrategy, Component, DestroyRef } from "@angular/core";
import DepartmentModel from "./models/department.model";
import { DepartmentsService } from "./services/departments.service";
import { Observable, Subject } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { EmployeesDepartmentCreateDialogComponent } from "@pages/employees/children/employees-department-create-dialog/employees-department-create-dialog.component";
import { EmployeesModule } from "./modules/employees.module";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { LoaderComponent } from "@shared/components/loader/loader.component";
import { BreadCrumbComponent } from "@shared/components/bread-crumb/bread-crumb.component";
import { EmployeesDepartmentCardComponent } from "./children/employees-department-card/employees-department-card.component";

@Component({
  selector: "app-employees",
  standalone: true,
  imports: [
    EmployeesModule,
    EmployeesDepartmentCardComponent,
    LoaderComponent,
    BreadCrumbComponent,
  ],
  templateUrl: "./employees.component.html",
  styleUrl: "./employees.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesComponent {
  protected departments$!: Observable<DepartmentModel[]>;
  protected isLoading$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private departmentsService: DepartmentsService,
    private dialog: MatDialog,
    private destroy$: DestroyRef,
  ) {
    this.departments$ = this.departmentsService.departments$.pipe(
      takeUntilDestroyed(this.destroy$),
    );
    this.departments$.subscribe(() => this.isLoading$.next(false));
  }

  protected openDepartmentCreateDialog() {
    this.dialog.open(EmployeesDepartmentCreateDialogComponent, {
      panelClass: "app-default-dialog",
    });
  }
}
