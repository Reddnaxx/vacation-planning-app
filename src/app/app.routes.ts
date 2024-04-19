import { Routes } from "@angular/router";
import { ProfileComponent } from "./pages/profile/profile.component";
import { EmployeesComponent } from "./pages/employees/employees.component";
import { CalendarComponent } from "./pages/calendar/calendar.component";
import { AuthGuard } from './pages/register/guards/auth.guard';

export const routes: Routes = [
  {
    path: "profile",
    title: "Профиль",
    component: ProfileComponent,
    loadChildren: () =>
      import("./pages/employees/modules/employees.module").then(
        m => m.EmployeesModule,
      ),
  },
  { path: "employees", title: "Сотрудники", component: EmployeesComponent },
  { path: "calendar", title: "Календарь", component: CalendarComponent },
  {
    path: '',
    loadChildren: () => import('./pages/register/public.module').then(m => m.PublicModule)
  },
];
