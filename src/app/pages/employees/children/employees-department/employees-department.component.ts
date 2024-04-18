import { Component, Inject, Input, OnInit } from "@angular/core";
import { MaterialModule } from "../../../../shared/modules/material/material.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { EmployeesEmployeeComponent } from "../employees-employee/employees-employee.component";
import { EmployeeModel } from "../../models/employee.model";
import { CommonModule } from "@angular/common";
import DepartmentModel from "../../models/department.model";
import { EmployeesService } from "../../services/employees.service";
import { BehaviorSubject, map } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { EmployeesAddDialogComponent } from '../employees-add-dialog/employees-add-dialog.component';

@Component({
  selector: "app-employees-department",
  standalone: true,
  imports: [
    MaterialModule,
    MatExpansionModule,
    EmployeesEmployeeComponent,
    CommonModule,
  ],
  templateUrl: "./employees-department.component.html",
  styleUrl: "./employees-department.component.scss",
})
export class EmployeesDepartmentComponent implements OnInit {
  @Input({ required: true })
  public department!: DepartmentModel;

  public employees$!: BehaviorSubject<EmployeeModel[]>;

  constructor(
    private employeesService: EmployeesService,
    private matDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.employees$ = new BehaviorSubject<EmployeeModel[]>([]);
    this.employeesService.employees$
      .pipe(
        map(value =>
          value.filter(item => item.department === this.department.id),
        ),
      )
      .subscribe(value => this.employees$.next(value));
  }

  protected openAddEmployeeDialog() {
    this.matDialog.open(EmployeesAddDialogComponent, {
      data: { id: this.department.id },
      panelClass: "app-default-dialog",
    });
  }
}
