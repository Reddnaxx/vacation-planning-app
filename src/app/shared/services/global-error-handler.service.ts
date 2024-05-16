import { ErrorHandler, Inject, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ILoggerService } from "@shared/services/loggers/interfaces/logger-service.interface";
import { LoggerService } from "@shared/services/loggers/logger-factory.service";

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(
    private snackBar: MatSnackBar,
    @Inject(LoggerService) private loggerService: ILoggerService,
  ) {}

  handleError(error: Error): void {
    this.loggerService.error(error);
    this.snackBar.open(`ОШИБКА: ${error.message}`, "Закрыть", {
      horizontalPosition: "right",
      panelClass: "app-snack-bar-error",
    });
  }
}
