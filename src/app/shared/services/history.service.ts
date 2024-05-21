import { Injectable } from "@angular/core";
import HistoryModel from "@pages/profile/models/history.model";
import { Observable } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { catchError } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({ providedIn: "root" })
export class HistoryService {
  private historyCollection: AngularFirestoreCollection<HistoryModel>;
  public history$!: Observable<HistoryModel[]>;

  constructor(
    private fs: AngularFirestore,
    private fa: AngularFireAuth,
  ) {
    this.historyCollection = this.fs.collection<HistoryModel>("/history");
    this.history$ = this.historyCollection.valueChanges().pipe(
      catchError(err => {
        throw new Error(err);
      }),
    );
  }

  public async create(
    dateStart: string,
    dateEnd: string,
    type: string,
    reason: string,
  ): Promise<HistoryModel> {
    const newHistory: HistoryModel = {
      id: "",
      dateStart: dateStart,
      dateEnd: dateEnd,
      type: type,
      reason: reason,
      status: "Ожидание",
    };

    await this.historyCollection
      .add(newHistory)
      .then(res => {
        res.update({ id: res.id });
      })
      .catch(err => {
        throw new Error(err);
      });

    return newHistory;
  }

  public async remove(id: string) {
    await this.historyCollection.doc(id).delete();
  }

  public async edit(
    id: string,
    reason: string,
    type: string,
    dateStart: string,
    dateEnd: string,
  ) {
    await this.fs
      .collection<HistoryModel>("/history")
      .doc(id)
      .update({
        dateStart: dateStart,
        dateEnd: dateEnd,
        type: type,
        reason: reason,
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  public async update(id: string, status: "Принято" | "Отклонено") {
    await this.fs
      .collection<HistoryModel>("/history")
      .doc(id)
      .update({
        status: status,
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  public getHistoryByStatus(
    status: "Принято" | "Отклонено" | "Ожидание",
  ): Observable<HistoryModel[]> {
    return this.fs
      .collection<HistoryModel>("/history", ref => ref.where("status", "==", status))
      .valueChanges()
      .pipe(
        catchError(err => {
          throw new Error(err);
        })
      );
  }
}
