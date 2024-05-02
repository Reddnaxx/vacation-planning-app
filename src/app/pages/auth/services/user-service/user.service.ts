import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import UserModel from '../../../../shared/models/user.model'
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private snackbar: MatSnackBar) { }

  create(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>('api/users', user).pipe(
      tap((createdUser: UserModel) => this.snackbar.open(`User ${createdUser.firstName} created successfully`, 'Close', {
        duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
      })),
    )
  }
}