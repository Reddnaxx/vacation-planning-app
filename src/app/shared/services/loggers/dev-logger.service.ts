import { Injectable } from "@angular/core";
import { environment } from "@environment/environment";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { ILoggerService } from "@shared/services/loggers/interfaces/logger-service.interface";

@Injectable()
export class DevLoggerService implements ILoggerService {
  private logs: string[] = [];

  constructor(private fs: AngularFirestore) {}

  public log(message: string) {
    this.logs.push(`${new Date().toLocaleTimeString()} log: ${message}`);

    this.sendLogs();

    console.log(
      `%cLOG: ${message}`,
      "color: #8338ec; font-weight: bold; font-size: 0.875rem",
    );
  }

  public success(message: string) {
    this.logs.push(`${new Date().toLocaleTimeString()} success: ${message}`);

    this.sendLogs();

    console.log(
      `%cSUCCESS: ${message}`,
      "color: #06d6a0; font-weight: bold; font-size: 0.875rem",
    );
  }

  public error(error: Error) {
    this.logs.push(`${new Date().toLocaleTimeString()} ERROR: ${error}`);

    this.sendLogs(true);

    console.error(
      `%cERROR: ${error.message}`,
      "color: #ef233c; font-weight: bold; font-size: 0.875rem",
    );
  }

  public sendLogs(withoutCheck?: boolean) {
    if (!withoutCheck && this.logs.length < environment.logger.minLength)
      return;

    this.fs.collection("/logs").add({
      date: new Date(),
      user: "Пока нету",
      logs: this.logs,
    });
    this.logs = [];
  }
}
