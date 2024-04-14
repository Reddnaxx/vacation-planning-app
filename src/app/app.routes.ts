import { Routes } from "@angular/router";
import { ProfileComponent } from "./pages/profile/profile.component";
import { EmployeesComponent } from "./pages/employees/employees.component";

export const routes: Routes = [
  { path: "profile", title: "Профиль", component: ProfileComponent },
  { path: "employees", title: "Сотрудники", component: EmployeesComponent },
];
