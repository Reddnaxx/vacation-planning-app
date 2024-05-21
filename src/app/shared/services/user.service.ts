import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { filter, map, Observable } from "rxjs";
import UserModel from "@shared/models/user.model";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private usersCollection: AngularFirestoreCollection<UserModel>;

  constructor(
    private fs: AngularFirestore,
    private fa: AngularFireAuth,
  ) {
    this.usersCollection = this.fs.collection<UserModel>("/users");
  }

  public getById(id: string): Observable<UserModel> {
    return this.fs
      .doc<UserModel>(id)
      .valueChanges()
      .pipe(filter(value => value !== undefined)) as Observable<UserModel>;
  }

  public async edit(id: string, data: Partial<UserModel>) {
    await this.fs.doc<UserModel>(`/users/${id}`).update(data);
    if (data.email && data.email?.length > 0) {
      await this.fa.currentUser.then(user => user?.updateEmail(data.email!));
    }
  }
}
