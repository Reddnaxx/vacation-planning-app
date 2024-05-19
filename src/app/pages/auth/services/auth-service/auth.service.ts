import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import UserModel from '@shared/models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private auth: AngularFireAuth) {
    this.auth.authState.subscribe((user) => {
      this.isAuthenticated.next(!!user);
    });
  }

  register(user: UserModel) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  login(user: UserModel) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  logout() {
    return this.auth.signOut().then(() => this.isAuthenticated.next(false));
  }

  getIsAuthenticated(): BehaviorSubject<boolean> {
    return this.isAuthenticated;
  }
}