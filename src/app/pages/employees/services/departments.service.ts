import { Injectable } from "@angular/core";
import DepartmentModel from "../models/department.model";
import { TestDepartments } from "../data/testDepartments";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class DepartmentsService {
  public departments$: BehaviorSubject<DepartmentModel[]>;

  constructor() {
    this.departments$ = new BehaviorSubject<DepartmentModel[]>(TestDepartments);
  }

  public create(name: string): DepartmentModel {
    const newArray = this.departments$.getValue();

    if (
      newArray.some(
        department => department.name.toLowerCase() === name.toLowerCase(),
      )
    )
      throw new Error(`${name} уже существует`);

    const newDepartment = new DepartmentModel(newArray.length + 1, name);

    newArray.push(newDepartment);
    this.departments$.next(newArray);

    return newDepartment;
  }

  public edit(id: number, name: string): void {
    if (!this.departments$.getValue().some(department => department.id === id))
      throw new Error(`Отдел с id ${id} не найден`);

    const array = this.departments$.getValue();

    if (
      array.some(
        department => department.name.toLowerCase() === name.toLowerCase(),
      )
    )
      throw new Error(`${name} уже существует`);

    array.map(department => {
      if (department.id === id) {
        return {
          ...department,
          name: name,
        };
      }

      return department;
    });

    this.departments$.next(array);
  }
}
