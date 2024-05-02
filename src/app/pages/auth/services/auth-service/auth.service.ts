import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ILoginResponse } from '../../../../shared/models/login-response.interface';
import UserModel from '../../../../shared/models/user.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private snackbar: MatSnackBar) { }

  login(user: UserModel): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>('api/users/login', user).pipe(
      tap((res: ILoginResponse) => localStorage.setItem('VacationPlanningApp', res.access_token)),
      tap(() => this.snackbar.open('Login Successfull', 'Close', {
        duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
      }))
    );
  }
}