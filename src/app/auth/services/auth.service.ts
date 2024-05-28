import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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
    this.router.navigateByUrl('/');
  }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post('http://localhost:3003/loginUser', { username, password });
  }

}