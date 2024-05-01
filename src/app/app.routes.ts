import { Routes } from "@angular/router";
import { ProfileComponent } from "./pages/profile/profile.component";
import { CalendarComponent } from "./pages/calendar/calendar.component";
import { PageNotFoundComponent } from "./shared/components/page-not-found/page-not-found.component";

export const routes: Routes = [
  { path: "profile", title: "Профиль", component: ProfileComponent },
  { path: "calendar", title: "Календарь", component: CalendarComponent },
  { path: '', loadChildren: () => import('./pages/auth/public.module').then(m => m.PublicModule) },
  { path: '**', title: "Страница не найдена", component: PageNotFoundComponent }
];
