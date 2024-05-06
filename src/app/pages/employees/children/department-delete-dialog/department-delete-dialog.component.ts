import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { IDepartmentDeleteDialogData } from "./interfaces/department-delete-dialog-data.interface";
import { EmployeesModule } from "../../modules/employees.module";
import { DepartmentsService } from "../../services/departments.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: "app-employees-delete-dialog",
  standalone: true,
  imports: [EmployeesModule],
  templateUrl: "./department-delete-dialog.component.html",
  styleUrl: "./department-delete-dialog.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DepartmentDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDepartmentDeleteDialogData,
    private departmentsService: DepartmentsService,
    private snackbar: MatSnackBar,
    private router: Router,
  ) {}

  protected onNoClick(): void {
    this.dialogRef.close();
  }

  protected async onDeleteClick() {
    this.dialogRef.close();
    await this.router.navigate(["/employees"], { replaceUrl: true });
    await this.departmentsService.remove(this.data.id).then(() => {
      this.snackbar.open(`${this.data.name} успешно удален`, "Ок", {
        horizontalPosition: "right",
        verticalPosition: "bottom",
        panelClass: "app-snack-bar-success",
      });
    });
  }
}
