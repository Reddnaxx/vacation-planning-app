import { Injectable } from "@angular/core";
import DepartmentModel from "../models/department.model";
import { TestDepartments } from "../data/testDepartments";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class DepartmentsService {
  public departments$: BehaviorSubject<DepartmentModel[]>;

  constructor() {
    this.departments$ = new BehaviorSubject<DepartmentModel[]>(TestDepartments);
  }
}
