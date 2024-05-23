import { Inject, Injectable } from "@angular/core";
import DepartmentModel from "../models/department.model";
import { filter, map, Observable, switchMap } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { catchError, tap } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import slug from "slug";
import UserModel from "@shared/models/user.model";
import { ILoggerService } from "@shared/services/loggers/interfaces/logger-service.interface";
import { LoggerService } from "@shared/services/loggers/logger-factory.service";
import { AuthService } from "@pages/auth/services/auth-service/auth.service";

@Injectable({ providedIn: "root" })
export class DepartmentsService {
  public departments$: Observable<DepartmentModel[]>;
  private departmentsCollection: AngularFirestoreCollection<DepartmentModel>;

  constructor(
    private fs: AngularFirestore,
    private fa: AngularFireAuth,
    private authService: AuthService,
    @Inject(LoggerService) private loggerService: ILoggerService,
  ) {
    this.loggerService.log("Fetching departments");
    this.departmentsCollection =
      this.fs.collection<DepartmentModel>("/departments");
    this.departments$ = this.departmentsCollection.valueChanges().pipe(
      tap({
        error: e => this.loggerService.error(e),
      }),
    );
    this.loggerService.success("Departments successfully fetched");
  }

  public async create(
    name: string,
    parent?: string | null,
  ): Promise<DepartmentModel> {
    this.loggerService.log("Creating new department");
    const userId = this.authService.userId;
    const newDepartment: DepartmentModel = {
      id: "",
      name: name,
      managerId: userId ? `users/${userId}` : "",
      slug: slug(name),
      parent: parent ?? "",
    };
    await this.departmentsCollection
      .add(newDepartment)
      .then(res => {
        res.update({ id: res.id });
        this.loggerService.success("Department created successfully");
      })
      .catch(err => {
        throw new Error(err);
      });
    return newDepartment;
  }

  public async remove(id: string) {
    await this.departmentsCollection
      .doc(id)
      .delete()
      .then(() => {
        this.fs
          .collection<UserModel>("/users", ref =>
            ref
              .where("department", "==", `departments/${id}`)
              .where("isActive", "==", true),
          )
          .get()
          .pipe()
          .forEach(e => e.forEach(r => r.ref.update({ isActive: false })));
      });
  }

  public getAllEmployees(): Observable<UserModel[]> {
    this.loggerService.log("Fetching all employees");
    return this.fs
      .collection<UserModel>("/users")
      .valueChanges()
      .pipe(
        catchError(err => {
          throw new Error(err);
        }),
        tap(() =>
          this.loggerService.success("All employees fetched successfully"),
        ),
      );
  }

  public getEmployeesByDepartment(id: string): Observable<UserModel[]> {
    return this.fs
      .collection<UserModel>("/users", ref =>
        ref
          .where("department", "==", `departments/${id}`)
          .where("isActive", "==", true),
      )
      .valueChanges()
      .pipe(
        map(value => value.reverse()),
        tap({
          error: e => this.loggerService.error(e),
        }),
      );
  }

  public getBySlug(slug: string) {
    this.loggerService.log(`Fetching department (slug: ${slug})`);

    return this.departments$.pipe(
      map(item => item.filter(dep => dep.slug === slug)[0]),
      tap({
        next: () =>
          this.loggerService.success("Department fetched successfully"),
        error: e => this.loggerService.error(e),
      }),
    );
  }

  public getByPath(path: string) {
    this.loggerService.log(`Fetching department (path: ${path})`);

    return this.fs.doc<DepartmentModel>(path).valueChanges();
  }

  public async edit(id: string, name: string) {
    this.loggerService.log(`Editing department (id: ${id})`);

    await this.fs
      .collection<DepartmentModel>("/departments")
      .doc(id)
      .update({
        name: name,
      })
      .then(() => {
        this.loggerService.success(`Department edited successfully`);
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  public async createEmployee(
    id: string,
    firstName: string,
    surname: string,
    lastName: string,
    phone: string,
    email: string,
    password: string,
  ) {
    this.loggerService.log(`Creating employee for department (id: ${id})`);

    await this.fa
      .createUserWithEmailAndPassword(email, password)
      .then(async data => {
        await this.fs
          .collection<UserModel>("/users")
          .add({
            id: "",
            uid: "",
            isActive: true,
            department: `departments/${id}`,
            firstName: firstName,
            surname: surname,
            lastName: lastName,
            phone: phone,
            email: email,
            role: "employee",
            password: "",
          })
          .then(res => {
            res.update({ id: res.id, uid: data.user?.uid });
            this.loggerService.success(
              `Employee (id: ${id}) created successfully`,
            );
            return res;
          })
          .catch(err => {
            throw new Error(err);
          });
      })
      .catch(async () => {
        await this.fs
          .collection<UserModel>("/users", ref =>
            ref.where("email", "==", email),
          )
          .get()
          .forEach(user =>
            user.docs[0].ref.update({
              isActive: true,
              firstName: firstName,
              lastName: lastName,
              surname: surname,
              phone: phone,
              email: email,
              department: `departments/${id}`,
            }),
          );
      });
  }

  public async removeEmployee(id: string) {
    this.loggerService.log(`Removing employee (id: ${id})`);
    await this.fs
      .collection<UserModel>(`/users`)
      .doc(id)
      .update({
        isActive: false,
      })
      .then(() => {
        this.loggerService.success(`Employee removed successfully`);
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  public async editEmployee(
    id: string,
    data: Partial<
      Omit<UserModel, "id" | "uid" | "department" | "role" | "isActive">
    >,
  ) {
    this.loggerService.log(`Editing employee (id: ${id})`);
    await this.fs
      .collection<UserModel>(`/users`)
      .doc(id)
      .update(data)
      .then(() => {
        this.loggerService.success(`Employee edited successfully`);
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  public getChildren(id: string) {
    return this.fs
      .collection<DepartmentModel>(`/departments`, ref =>
        ref.where("parent", "==", id),
      )
      .valueChanges();
  }

  public getParent(id: string) {
    return this.fs
      .collection<DepartmentModel>(`/departments`)
      .doc(id)
      .valueChanges()
      .pipe(
        filter(value => !!value?.parent),
        switchMap(value =>
          this.fs
            .collection<DepartmentModel>("/departments", ref =>
              ref.where("id", "==", value?.parent),
            )
            .valueChanges(),
        ),
        map(value => value[0]),
      );
  }
}
