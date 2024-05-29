import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidatorFn, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
// import { EmailValidator } from './helpers/form.helper';
import { User } from './helpers/user.interface';
import { AuthService } from '../services/auth.service';
import { catchError, delay, map, timeInterval } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { passwordCharactersValidator } from './helpers/form.helper';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;
  user!: User;

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NzNotificationService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createUserForm();
  }

  createUserForm() {
    this.userForm = this.formBuilder.group({
      Email: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(3),
          Validators.email,
        ],
        this.userExistsValidator
      ],
      Parola: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(6),
          // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          passwordCharactersValidator
        ],
      ],
      ConfirmParola: [
        '',
        [Validators.required],
        this.passwordMatchValidator
      ],
      Nume: ['', [Validators.required]],
      Prenume: ['', [Validators.required]],
    });
  }

  passwordMatchValidator: AsyncValidatorFn = (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    if (!control.value) return of(null);
    const password = this.userForm.controls['Parola'].value;
    return of(password === control.value ? null : { passwordMismatch: true });
  }

  userExistsValidator: AsyncValidatorFn = (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    if (!control.value) return of(null).pipe(delay(500));
    return this.authService.userExists(control.value).pipe(
      map((response: any) => {
        if (response.exists) {
          return { userExists: true };
        }
        return null;
      }),
      catchError((error) => {
        return of({ userExists: true });
      }),
      delay(500)

    );
  };


  addNewUser() {
    const nume = this.userForm.controls['Nume'].value;
    const email = this.userForm.controls['Email'].value;
    const parola = this.userForm.controls['Parola'].value;
    const prenume = this.userForm.controls['Prenume'].value;

    this.authService.register(nume, prenume, email, parola).subscribe(
      response => {
        this.notificationService.success('Registration Successful', 'User has been registered successfully.');
        // Navigate to the login page after successful registration
        this.router.navigateByUrl('/login');
      },
      error => {
        this.notificationService.error('Registration Failed', 'There was an error registering the user.');
      }
    );
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }

  // -------------- form getters ------------------
  get email(): AbstractControl {
    return this.userForm.get('Email') as AbstractControl;
  }

  get parola(): AbstractControl {
    return this.userForm.controls['Parola'];
  }

  get confirmParola(): AbstractControl {
    return this.userForm.controls['ConfirmParola'];
  }

  get nume(): AbstractControl {
    return this.userForm.controls['Nume'];
  }

  get prenume(): AbstractControl {
    return this.userForm.controls['Prenume'];
  }
}
