import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth-service/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login() {
    if (this.form.valid) {
      this.authService
        .loginUser(
          this.form.get("email")?.value,
          this.form.get("password")?.value,
        )
        .then(() => this.router.navigate(["../profile"]))
        .catch(error => console.error(error)); // Handle errors
    }
  }

  get email(): FormControl {
    return this.form.get("email") as FormControl;
  }

  get password(): FormControl {
    return this.form.get("password") as FormControl;
  }
}
