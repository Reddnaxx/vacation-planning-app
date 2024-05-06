import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth-service/auth.service';
import { CustomValidators } from '../../_helpers/custom-validators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirm: new FormControl(null, [Validators.required]),
    department: new FormControl(null, [Validators.required]),
  },
    { validators: CustomValidators.passwordsMatching }
  );

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    if (this.form.valid) {
      this.authService.registerUser(this.form.value)
        .then(() => this.router.navigate(['../login']))
        .catch(error => console.error(error)); // Handle errors
    }
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get firstName(): FormControl {
    return this.form.get('firstName') as FormControl
  }

  get lastName(): FormControl {
    return this.form.get('lastName') as FormControl
  }

  get department(): FormControl {
    return this.form.get('department') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get passwordConfirm(): FormControl {
    return this.form.get('passwordConfirm') as FormControl;
  }
}
