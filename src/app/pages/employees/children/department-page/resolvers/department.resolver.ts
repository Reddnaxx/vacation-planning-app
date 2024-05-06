import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { DepartmentsService } from "@pages/employees/services/departments.service";
import { IBreadCrumb } from "@shared/models/bread-crumb.interface";
import { map } from "rxjs";

export const departmentResolver: ResolveFn<IBreadCrumb> = (route, state) => {
  return inject(DepartmentsService)
    .get(route.params["slug"] || "")
    .pipe(map(value => ({ url: state.url, label: value.name })));
};
