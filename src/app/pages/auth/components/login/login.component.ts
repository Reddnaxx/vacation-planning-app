import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth-service/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  protected loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  protected async login() {
    await this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.password,
    );
    await this.router.navigate(["profile"]);
  }

  protected get email(): FormControl {
    return this.loginForm.get("email") as FormControl;
  }

  protected get password(): FormControl {
    return this.loginForm.get("password") as FormControl;
  }
}
