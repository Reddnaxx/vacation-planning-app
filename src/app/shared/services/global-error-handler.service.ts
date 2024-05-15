import { ErrorHandler, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LoggerService } from "@shared/services/logger.service";

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(
    private snackBar: MatSnackBar,
    private loggerService: LoggerService,
  ) {}

  handleError(error: Error): void {
    this.loggerService.error(error);
    this.snackBar.open(`ОШИБКА: ${error.message}`, "Закрыть", {
      horizontalPosition: "right",
      panelClass: "app-snack-bar-error",
    });
  }
}
