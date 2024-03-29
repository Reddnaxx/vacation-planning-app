import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [AngularFireModule.initializeApp(environment.firebase)]
})
export class FireModule {

}
