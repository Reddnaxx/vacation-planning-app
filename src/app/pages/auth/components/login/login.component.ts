import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth-service/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void { }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).then(
      () => {
        this.router.navigate(["../profile"])
      },
      (error) => {
        console.error(error);
      }
    );
  }

  get email(): FormControl {
    return this.loginForm.get("email") as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get("password") as FormControl;
  }
}
