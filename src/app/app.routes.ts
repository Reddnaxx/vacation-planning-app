import { Routes } from "@angular/router";
import { ProfileComponent } from "@pages/profile/profile.component";
import { CalendarComponent } from "@pages/calendar/calendar.component";
import { AuthGuard } from "@pages/auth/guards/auth-guard";

export const routes: Routes = [
  {
    path: "profile",
    title: "Профиль",
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: "Профиль",
    },
  },
  {
    path: "employees",
    loadChildren: () =>
      import("./pages/employees/modules/employees-routes").then(
        (m) => m.EMPLOYEES_ROUTES
      ),
    canActivate: [AuthGuard],
    data: {
      breadcrumb: "Сотрудники",
    },
  },
  {
    path: "calendar",
    title: "Календарь",
    component: CalendarComponent,
    canActivate: [AuthGuard],
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
      import("./pages/auth/public.module").then(m => m.PublicModule),
  },
];