import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { filter, Observable } from "rxjs";
import UserModel from '@shared/models/user.model';

@Injectable({
  providedIn: "root",
})
export class UserService {
  private usersCollection: AngularFirestoreCollection<UserModel>;

  constructor(private fs: AngularFirestore) {
    this.usersCollection = this.fs.collection<UserModel>("/users");
  }

  public getById(id: string): Observable<UserModel> {
    return this.fs
      .doc<UserModel>(id)
      .valueChanges()
      .pipe(filter(value => value !== undefined)) as Observable<UserModel>;
  }
}
