import { Routes } from "@angular/router";
import { ProfileComponent } from "@pages/profile/profile.component";
import { EmployeesComponent } from "@pages/employees/employees.component";
import { CalendarComponent } from "@pages/calendar/calendar.component";
import { DepartmentPageComponent } from "@pages/employees/children/department-page/department-page.component";
import { departmentResolver } from "@pages/employees/children/department-page/resolvers/department.resolver";

export const routes: Routes = [
  {
    path: "profile",
    title: "Профиль",
    component: ProfileComponent,
    data: {
      breadcrumb: "Профиль",
    },
    loadChildren: () =>
      import("./pages/employees/modules/employees.module").then(
        m => m.EmployeesModule,
      ),
  },
  {
    path: "employees",
    data: {
      breadcrumb: "Сотрудники",
    },
    children: [
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
    ],
  },
  {
    path: "calendar",
    title: "Календарь",
    component: CalendarComponent,
    data: {
      breadcrumb: "Календарь",
    },
  },
  {
    path: "",
    data: {
      breadcrumb: "Планировщик отпусков",
    },
    loadChildren: () =>
      import("./pages/register/public.module").then(m => m.PublicModule),
  },
];
