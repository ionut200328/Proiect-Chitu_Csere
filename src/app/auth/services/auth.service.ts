import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = '';

  constructor(private httpClient: HttpClient, private router: Router) {
    if (sessionStorage.getItem('userToken')) {
      this.token = sessionStorage.getItem('userToken');
    }

    if (localStorage.getItem('userToken')) {
      this.token = localStorage.getItem('userToken');
    }
  }

  getToken(): string | null {
    return this.token;
  }

  setToken(value: string): void {
    this.token = value;
  }

  logOut() {
    this.token = null;
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  login(email: string, parola: string): Observable<any> {
    return this.httpClient.post('http://localhost:3003/loginUser', { email, parola })
      .pipe(
        tap((response: any) => {
          console.log(response);
          if (response.name) {
            localStorage.setItem('userName', response.name);
          }
        })
      );
  }

  getUserName(): string {
    return localStorage.getItem('userName') || '';
  }

  register(nume: string, prenume: string, email: string, parola: string): Observable<any> {
    return this.httpClient.post('http://localhost:3003/registerUser', { nume, prenume, email, parola });
  }
  generateToken(): string {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(7);
    return `${timestamp}-${randomString}`;
  }

  userExists(email: string): Observable<any> {
    return this.httpClient.post('http://localhost:3003/userExists', { email })
      .pipe(
        catchError((error) => {
          if (error.status === 409) {
            console.log(console.error);

          }
          return throwError(error);
        })
      );
  }
}