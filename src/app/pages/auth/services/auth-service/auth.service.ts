import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Observable } from "rxjs";
import UserModel from "../../../../shared/models/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  registerUser(user: UserModel): Promise<object> {
    if (user.email && user.password) {
      return this.afAuth.createUserWithEmailAndPassword(
        user.email,
        user.password,
      );
    } else {
      return Promise.reject("Email и пароль обязательны для регистрации.");
    }
  }

  loginUser(email: string, password: string): Promise<object> {
    if (email && password) {
      return this.afAuth.signInWithEmailAndPassword(email, password);
    } else {
      return Promise.reject("Email и пароль обязательны для входа.");
    }
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }
}
