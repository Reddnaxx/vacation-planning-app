import { filter, Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { IGlobalEvent } from "@shared/models/global-event.model";

@Injectable({
  providedIn: "root",
})
export class GlobalEventService {
  private subject = new Subject<IGlobalEvent>();

  publish(event: IGlobalEvent) {
    this.subject.next(event);
  }

  on(eventName: string): Observable<IGlobalEvent> {
    return this.subject
      .asObservable()
      .pipe(filter(event => event.name === eventName));
  }
}
