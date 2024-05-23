import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { IUser } from "../../model/user.interface";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar,
  ) {}

  create(user: IUser): Observable<IUser> {
    return this.http.post<IUser>("api/users", user).pipe(
      tap((createdUser: IUser) =>
        this.snackbar.open(
          `User ${createdUser.firstName} created successfully`,
          "Close",
          {
            duration: 2000,
            horizontalPosition: "right",
            verticalPosition: "top",
          },
        ),
      ),
    );
  }
}
