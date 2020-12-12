import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpointAuth = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) { }

  signup(signupDto: any): Observable<User> {
    return this.http.post<User>(`${this.endpointAuth}/signup`, signupDto)
      .pipe(catchError(err => {
        console.error('There was an error getting data');
        return throwError(err);
      }));
  }

  login(loginDto: any): Observable<{accessToken: string, name: string}> {
    return this.http.post<{accessToken: string, name: string}>(`${this.endpointAuth}/login`, loginDto)
      .pipe(catchError(err => {
        console.error('There was an error getting data');
        return throwError(err);
      }));
  }

  isLoggedIn(): any {
    return !!localStorage.getItem('token');
  }

  userLogout(): any {
    localStorage.removeItem('token');
  }
}
