import { Injectable } from "@angular/core";
import DepartmentModel from "../models/department.model";
import { TestDepartments } from "../data/testDepartments";

@Injectable()
export class DepartmentsService {
  public departments: DepartmentModel[];

  constructor() {
    this.departments = TestDepartments;
  }

  public getAll(): DepartmentModel[] {
    return this.departments;
  }
}
