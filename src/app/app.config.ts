import { ApplicationConfig, ErrorHandler, importProvidersFrom } from '@angular/core';
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { environment } from "../environments/environment";
import { HttpClientModule } from "@angular/common/http";
import { GlobalErrorHandlerService } from './shared/services/global-error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase)),
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    provideAnimationsAsync(),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService,
    },
  ],
};
