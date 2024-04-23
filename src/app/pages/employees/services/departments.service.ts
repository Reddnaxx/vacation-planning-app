import { Injectable } from "@angular/core";
import DepartmentModel from "../models/department.model";
import { Observable } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { EmployeeModel } from "../models/employee.model";
import { catchError } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({ providedIn: "root" })
export class DepartmentsService {
  public departments$: Observable<DepartmentModel[]>;
  private departmentsCollection: AngularFirestoreCollection<DepartmentModel>;

  constructor(
    private fs: AngularFirestore,
    private fa: AngularFireAuth,
  ) {
    this.departmentsCollection =
      this.fs.collection<DepartmentModel>("/departments");
    this.departments$ = this.departmentsCollection.valueChanges().pipe(
      catchError(err => {
        throw new Error(err);
      }),
    );
  }

  public async create(name: string): Promise<DepartmentModel> {
    const newDepartment: DepartmentModel = {
      id: "",
      name: name,
    };
    await this.departmentsCollection
      .add(newDepartment)
      .then(res => {
        res.update({ id: res.id });
      })
      .catch(err => {
        throw new Error(err);
      });
    return newDepartment;
  }

  public getEmployees(id: string): Observable<EmployeeModel[]> {
    return this.fs
      .collection<EmployeeModel>("/users", ref =>
        ref
          .where("department", "==", `departments/${id}`)
          .where("isActive", "==", true),
      )
      .valueChanges()
      .pipe(
        catchError(err => {
          throw new Error(err);
        }),
      );
  }

  public async edit(id: string, name: string) {
    await this.fs
      .collection<DepartmentModel>("/departments")
      .doc(id)
      .update({
        name: name,
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  public async createEmployee(
    id: string,
    name: string,
    phone: string,
    email: string,
    password: string,
  ) {
    await this.fa
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        await this.fs
          .collection<EmployeeModel>("/users")
          .add({
            id: this.fs.createId(),
            isActive: true,
            department: `departments/${id}`,
            name: name,
            phone: phone,
            email: email,
          })
          .then(res => {
            res.update({ id: res.id });
            return res;
          })
          .catch(err => {
            throw new Error(err);
          });
      })
      .catch(async () => {
        await this.fs
          .collection<EmployeeModel>("/users", ref =>
            ref.where("email", "==", email),
          )
          .get()
          .forEach(user =>
            user.docs[0].ref.update({
              isActive: true,
              name: name,
              phone: phone,
              email: email,
              department: `departments/${id}`,
            }),
          );
      });
  }

  public async removeEmployee(id: string) {
    await this.fs
      .collection<EmployeeModel>(`/users`)
      .doc(id)
      .update({
        isActive: false,
      })
      .catch(err => {
        throw new Error(err);
      });
  }
}
