import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from './services/auth.service';
import { User } from './modals/User';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private notification: NzNotificationService,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      parola: ['', [Validators.required, /*Validators.minLength(6), Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')*/]],
      rememberMe: false
    });
    console.log(this.form);
  }

  get email(): AbstractControl {
    return this.form.get('email') as AbstractControl;
  }

  get parola(): AbstractControl {
    return this.form.get('parola') as AbstractControl;
  }

  get rememberMe(): AbstractControl {
    return this.form.get('rememberMe') as AbstractControl;
  }

  onSubmit(): void {
    const hardcodedUsername = 'admin';
    const hardcodedPassword = '123';

    console.log(this.parola.value);
    console.log(this.email.value);
    console.log(this.rememberMe.value);


    // if (this.name === hardcodedUsername && this.password === hardcodedPassword) {
    //   this.notification.success('Login Successful', 'You have logged in successfully.');
    //   sessionStorage.setItem('userToken', 'token')
    //   if (this.rememberMe)
    //     localStorage.setItem('userToken', 'token')
    //   this.router.navigate(['']);
    // } else {
    //   this.notification.error('Login Failed', 'Incorrect username or password.');
    // }

    this.authService.login(this.email.value, this.parola.value).subscribe(
      (user: User) => {
        // Login successful
        this.notification.success('Login Successful', 'You have logged in successfully.');
        const token = this.authService.generateToken();
        sessionStorage.setItem('userToken', token);
        if (this.rememberMe.value) {
          localStorage.setItem('userToken', token);

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
  navigateToRegister(): void {
    this.router.navigate(['register']);
  }
}
