import { ErrorHandler, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private snackBar: MatSnackBar) {}

  handleError(error: Error): void {
    console.error(`ERROR: ${error.message}`);
    this.snackBar.open(`ОШИБКА: ${error.message}`, "Закрыть", {
      horizontalPosition: "right",
      panelClass: "app-snack-bar-error",
    });
  }
}
