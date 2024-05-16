import { Injectable } from "@angular/core";
import { environment } from "@environment/environment";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { ILoggerService } from "@shared/services/loggers/interfaces/logger-service.interface";

@Injectable()
export class ProdLoggerService implements ILoggerService {
  private logs: string[] = [];

  constructor(private fs: AngularFirestore) {}

  public log(message: string) {
    this.logs.push(`${new Date().toLocaleTimeString()} log: ${message}`);
  }

  public success(message: string) {
    this.logs.push(`${new Date().toLocaleTimeString()} success: ${message}`);
  }

  public error(error: Error) {
    this.logs.push(`${new Date().toLocaleTimeString()} ERROR: ${error}`);

    this.sendLogs(true);
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
