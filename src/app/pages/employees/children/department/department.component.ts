import { Component, DestroyRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import DepartmentModel from "../../models/department.model";
import { DepartmentsService } from "../../services/departments.service";
import { Observable } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { AsyncPipe, NgIf } from "@angular/common";
import { LoaderComponent } from "../../../../shared/components/loader/loader.component";

@Component({
  selector: "app-department",
  standalone: true,
  imports: [NgIf, AsyncPipe, LoaderComponent],
  templateUrl: "./department.component.html",
  styleUrl: "./department.component.scss",
})
export class DepartmentComponent {
  protected department$!: Observable<DepartmentModel>;

  constructor(
    private route: ActivatedRoute,
    private departmentsService: DepartmentsService,
    private destroyRef: DestroyRef,
  ) {
    this.route.params.pipe(takeUntilDestroyed(destroyRef)).subscribe(params => {
      this.department$ = this.departmentsService.get(params["slug"]);
    });
  }
}
