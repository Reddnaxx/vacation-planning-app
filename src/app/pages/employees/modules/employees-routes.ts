import { Routes } from "@angular/router";
import { EmployeesComponent } from "@pages/employees/employees.component";
import { DepartmentPageComponent } from "@pages/employees/children/department-page/department-page.component";
import { departmentResolver } from "@pages/employees/children/department-page/resolvers/department.resolver";

export const EMPLOYEES_ROUTES: Routes = [
  {
    path: "",
    pathMatch: "full",
    title: "Сотрудники",
    component: EmployeesComponent,
  },
  {
    path: ":slug",
    component: DepartmentPageComponent,
    resolve: { breadcrumb: departmentResolver },
  },
];
