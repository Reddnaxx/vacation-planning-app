import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { IEmployeesDeleteDialogData } from "./interfaces/employees-delete-dialog-data.interface";
import { MatButtonModule } from "@angular/material/button";
import { EmployeesService } from "../../services/employees.service";
import { MatDividerModule } from "@angular/material/divider";
import { EmployeesModule } from "../../modules/employees.module";

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
    private employeesService: EmployeesService,
  ) {}

  protected onNoClick(): void {
    this.dialogRef.close();
  }

  protected onDeleteClick(): void {
    this.employeesService.delete(this.data.id);
    this.dialogRef.close();
  }
}
