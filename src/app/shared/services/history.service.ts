import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import HistoryModel from "../../pages/profile/children/models/history.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HistoryService {
  private apiUrl = "http://localhost:4200/profile";
  constructor(private http: HttpClient) {}
  updateHistory(history: HistoryModel): Observable<HistoryModel> {
    const url = `${this.apiUrl}/${history.id}`;
    return this.http.put<HistoryModel>(url, history);
  }
}
