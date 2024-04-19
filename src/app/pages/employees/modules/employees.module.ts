import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../../../shared/modules/material/material.module";
import { FilterPipe } from "../../../shared/pipes/filter.pipe";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [FilterPipe],
  exports: [CommonModule, MaterialModule, FilterPipe, ReactiveFormsModule],
})
export class EmployeesModule {}
