import { Component } from "@angular/core";
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-confirm-delete-dialog-component",
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButton],
  templateUrl: "./confirm-delete-dialog-component.component.html",
  styleUrl: "./confirm-delete-dialog-component.component.scss",
})
export class ConfirmDeleteDialogComponentComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialogComponentComponent>,
    private snackBar: MatSnackBar,
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
    this.showDeleteSuccessSnackBar();
  }

  private showDeleteSuccessSnackBar() {
    this.snackBar.open("Заявка успешно удалена", "Ок", {
      panelClass: "app-snack-bar-success",
      horizontalPosition: "right",
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
