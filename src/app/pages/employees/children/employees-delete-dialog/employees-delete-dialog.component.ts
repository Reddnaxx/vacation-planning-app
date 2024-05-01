import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { IEmployeesDeleteDialogData } from "./interfaces/employees-delete-dialog-data.interface";
import { EmployeesModule } from "../../modules/employees.module";
import { DepartmentsService } from "../../services/departments.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-employees-delete-dialog",
  standalone: true,
  imports: [EmployeesModule],
  templateUrl: "./employees-delete-dialog.component.html",
  styleUrl: "./employees-delete-dialog.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EmployeesDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEmployeesDeleteDialogData,
    private departmentsService: DepartmentsService,
    private snackbar: MatSnackBar,
  ) {}

  protected onNoClick(): void {
    this.dialogRef.close();
  }

  protected async onDeleteClick() {
    await this.departmentsService.removeEmployee(this.data.id).then(() => {
      this.snackbar.open(`${this.data.name} успешно удален из отдела`, "Ок", {
        horizontalPosition: "right",
        verticalPosition: "bottom",
        panelClass: "app-snack-bar-success",
      });
    });
    this.dialogRef.close();
  }
}
