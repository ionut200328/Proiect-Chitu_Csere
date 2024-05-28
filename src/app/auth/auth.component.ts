import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from './services/auth.service';
import { User } from './modals/User';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  name: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(
    private notification: NzNotificationService,
    private router: Router,
    private authService: AuthService
  ) { }

  onSubmit(): void {
    const hardcodedUsername = 'admin';
    const hardcodedPassword = '123';

    console.log(this.name);
    console.log(this.password);


    // if (this.name === hardcodedUsername && this.password === hardcodedPassword) {
    //   this.notification.success('Login Successful', 'You have logged in successfully.');
    //   sessionStorage.setItem('userToken', 'token')
    //   if (this.rememberMe)
    //     localStorage.setItem('userToken', 'token')
    //   this.router.navigate(['']);
    // } else {
    //   this.notification.error('Login Failed', 'Incorrect username or password.');
    // }

    this.authService.login(this.name, this.password).subscribe(
      (user: User) => {
        // Login successful
        this.notification.success('Login Successful', 'You have logged in successfully.');
        sessionStorage.setItem('userToken', 'token');
        if (this.rememberMe) {
          localStorage.setItem('userToken', 'token');
        }
        this.router.navigate(['']);
      },
      (error) => {
        // Login failed
        if (error.status === 401) {
          this.notification.error('Login Failed', 'Incorrect username or password.');
        }
      }
    );
  }
}
