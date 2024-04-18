import { Routes } from "@angular/router";
import { ProfileComponent } from "./pages/profile/profile.component";
import { CalendarComponent } from "./pages/calendar/calendar.component";
import { AuthGuard } from './pages/register/guards/auth.guard';

export const routes: Routes = [
  { path: "profile", title: "Профиль", component: ProfileComponent },
  { path: "calendar", title: "Календарь", component: CalendarComponent },
  {
    path: '',
    loadChildren: () => import('./pages/register/public.module').then(m => m.PublicModule)
  },
];
