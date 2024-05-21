import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { HomePageComponent } from "@pages/home-page/home-page.component";

const routes: Routes = [
  {
    path: "",
    component: HomePageComponent,
  },
  {
    path: "register",
    title: "Регистрация",
    data: { breadcrumb: "Регистрация" },
    component: RegisterComponent,
  },
  {
    path: "login",
    title: "Авторизация",
    data: { breadcrumb: "Авторизация" },
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
