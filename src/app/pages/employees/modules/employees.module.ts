import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@shared/modules/material/material.module";
import { FilterPipe } from "@shared/pipes/filter.pipe";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { LoaderComponent } from "@shared/components/loader/loader.component";

@NgModule({
  providers: [AngularFirestore],
  imports: [FilterPipe, LoaderComponent],
  exports: [
    CommonModule,
    MaterialModule,
    FilterPipe,
    ReactiveFormsModule,
    LoaderComponent,
  ],
})
export class EmployeesModule {}
