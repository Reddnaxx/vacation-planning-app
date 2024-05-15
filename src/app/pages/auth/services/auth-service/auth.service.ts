import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import UserModel from '@shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  register(user: UserModel) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  login(user: UserModel) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  logout() {
    return this.auth.signOut();
  }
}
