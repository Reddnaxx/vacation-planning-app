import { Routes } from "@angular/router";
import { ProfileComponent } from "@pages/profile/profile.component";
import { CalendarComponent } from "@pages/calendar/calendar.component";

export const routes: Routes = [
  {
    path: "profile",
    title: "Профиль",
    component: ProfileComponent,
    data: {
      breadcrumb: "Профиль",
    },
  },
  {
    path: "employees",
    loadChildren: () =>
      import("./pages/employees/modules/employees-routes").then(
        m => m.EMPLOYEES_ROUTES,
      ),
    data: {
      breadcrumb: "Сотрудники",
    },
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
    loadChildren: () =>
      import("./pages/register/public.module").then(m => m.PublicModule),
    data: {
      breadcrumb: "Планировщик отпусков",
    },
  },
];
