import { Injectable } from "@angular/core";
import HistoryModel from "@pages/profile/models/history.model";
import { filter, Observable } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { catchError, tap } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { GlobalEventService } from "@shared/services/global-event.service";
import { AuthService } from "@pages/auth/services/auth-service/auth.service";

@Injectable({ providedIn: "root" })
export class HistoryService {
  private historyCollection: AngularFirestoreCollection<HistoryModel>;
  public history$!: Observable<HistoryModel[]>;

  constructor(
    private fs: AngularFirestore,
    private fa: AngularFireAuth,
    private authService: AuthService,
    private globalEventService: GlobalEventService,
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
      userId: this.authService.userId,
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

  public getUserHistory(): Observable<HistoryModel[]> {
    const userId = this.authService.userId;
    return this.fs
      .collection<HistoryModel>("/history", ref =>
        ref.where("userId", "==", userId),
      )
      .valueChanges()
      .pipe(
        catchError(err => {
          throw new Error(err);
        }),
      );
  }

  public getHistoryByStatus(
    status: "Принято" | "Отклонено" | "Ожидание",
  ): Observable<HistoryModel[]> {
    return this.fs
      .collection<HistoryModel>("/history", ref =>
        ref.where("status", "==", status),
      )
      .valueChanges()
      .pipe(
        catchError(err => {
          throw new Error(err);
        }),
        tap(async value => {
          if (this.authService.isManager$.value && value.length > 0) {
            this.globalEventService.publish({
              name: "notification",
              content: `Получены новые заявки (${value.length})`,
            });
          }
        }),
      );
  }
}
