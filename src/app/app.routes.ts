import { Routes } from "@angular/router";
import { ProfileComponent } from "@pages/profile/profile.component";
import { CalendarComponent } from "@pages/calendar/calendar.component";
import { privateGuard } from "@pages/auth/guards/private-guard";
import { publicGuard } from "@pages/auth/guards/public-guard";
import { PageNotFoundComponent } from "@pages/page-not-found/page-not-found.component";
import { managerGuard } from "@pages/employees/guards/manager.guard";

export const routes: Routes = [
  {
    path: "profile",
    title: "Профиль",
    component: ProfileComponent,
    canActivate: [privateGuard],
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
    canActivate: [privateGuard, managerGuard],
    data: {
      breadcrumb: "Сотрудники",
    },
  },
  {
    path: "calendar",
    title: "Календарь",
    component: CalendarComponent,
    canActivate: [privateGuard],
    data: {
      breadcrumb: "Календарь",
    },
  },
  {
    path: "",
    data: {
      breadcrumb: "Планировщик отпусков",
    },
    canActivate: [publicGuard],
    loadChildren: () =>
      import("./pages/auth/public.module").then(m => m.PublicModule),
  },
  {
    path: "**",
    title: "Страница не найдена",
    component: PageNotFoundComponent,
  },
];
