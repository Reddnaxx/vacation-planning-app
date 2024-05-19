import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import UserModel from '@shared/models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CustomValidators } from '@pages/auth/_helpers/custom-validators';
import DepartmentModel from '@pages/employees/models/department.model';

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

  departments!: DepartmentModel[];

  constructor(private authService: AuthService, private router: Router, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore.collection('departments').valueChanges().subscribe((data: any[]) => {
      this.departments = data;
    });
  }

  onRegister() {
    if (this.form.invalid) {
      return;
    }

    const user: UserModel = {
      email: this.form.value.email,
      password: this.form.value.password,
      firstName: this.form.value.firstName,
      surname: '',
      lastName: this.form.value.lastName,
      department: this.form.value.department,
      isActive: false,
      id: '',
      uid: '',
      role: ''
    };

    this.authService.register(user).then(
      () => {
        this.firestore.collection('users').add(user);
        this.router.navigate(["../profile"])
      },
      (error) => {
        console.error(error);
      }
    );
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
