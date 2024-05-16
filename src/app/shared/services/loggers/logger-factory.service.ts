import { environment } from "@environment/environment";
import { ProdLoggerService } from "@shared/services/loggers/prod-logger.service";
import { DevLoggerService } from "@shared/services/loggers/dev-logger.service";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { ILoggerService } from "@shared/services/loggers/interfaces/logger-service.interface";
import { InjectionToken } from "@angular/core";

export const LoggerService = new InjectionToken("Logger service token");

export const LoggerServiceFactory = (
  firestore: AngularFirestore,
): ILoggerService => {
  switch (environment.production) {
    case true:
      return new ProdLoggerService(firestore);
    case false:
      return new DevLoggerService(firestore);
  }
};
