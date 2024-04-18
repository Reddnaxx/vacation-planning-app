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

  public moveToDepartment(departmentId: number, email: string): EmployeeModel {
    const employees = this.employees$.getValue();
    const employee = employees.find(employee => employee.email === email);

    if (!employee) throw new Error(`Пользователь с почтой ${email} не найден`);

    if (employee.department === departmentId)
      throw new Error(`${employee.name} уже находится в этом отделе`);

    const newArray: EmployeeModel[] = employees.map(employee => {
      if (employee.email === email) {
        return { ...employee, department: departmentId };
      }

      return employee;
    });

    this.employees$.next(newArray);

    return employee;
  }
}
