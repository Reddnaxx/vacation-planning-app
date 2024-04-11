import { Routes } from "@angular/router";
import { ProfileComponent } from "./pages/profile/profile.component";
import { CalendarComponent } from "./pages/calendar/calendar.component";
import { RegistrationComponent } from "./pages/registration/registration.component"

export const routes: Routes = [
  { path: "profile", title: "Профиль", component: ProfileComponent },
  { path: "calendar", title: "Календарь", component: CalendarComponent },
  { path: "registration", title: "Регистрация", component: RegistrationComponent },
];
