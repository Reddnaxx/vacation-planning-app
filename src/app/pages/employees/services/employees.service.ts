import { Injectable } from "@angular/core";
import { EmployeeModel } from "../models/employee.model";
import { TestEmployees } from "../data/testEmployees";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class EmployeesService {
  public employees$: BehaviorSubject<EmployeeModel[]>;

  constructor() {
    this.employees$ = new BehaviorSubject<EmployeeModel[]>(TestEmployees);
  }

  public delete(id: number): void {
    const newArray: EmployeeModel[] = this.employees$.getValue();
    for (let i = newArray.length - 1; i >= 0; i--) {
      if (newArray[i].id === id) {
        newArray.splice(i, 1);
      }
    }

    this.employees$.next(newArray);
  }
}
