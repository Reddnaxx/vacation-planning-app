import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({
    'projectId': 'vacationplanningapp-7d4f7',
    'appId': '1:657987093593:web:b9049a5dbeef63bc8e9d48',
    'storageBucket': 'vacationplanningapp-7d4f7.appspot.com',
    'apiKey': 'AIzaSyBnd7P3TamJXSBFDP56sUtRk7DPb5AfS7g',
    'authDomain': 'vacationplanningapp-7d4f7.firebaseapp.com',
    'messagingSenderId': '657987093593',
    'measurementId': 'G-N0LS1KWPCK'
  }))), importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore()))]
};
