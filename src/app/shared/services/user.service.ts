import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { UserModel } from "../../pages/employees/models/user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private usersCollection: AngularFirestoreCollection<UserModel>;

  constructor(private fs: AngularFirestore) {
    this.usersCollection = this.fs.collection<UserModel>("/users");
  }

  public getById(id: string) {
    return this.fs.doc<UserModel>(id).valueChanges();
  }
}
