import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { EmailValidator } from './helpers/form.helper';
import { User } from './helpers/user.interface';
import { AuthService } from '../services/auth.service';

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
  ) {}

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
          EmailValidator,
        ],
      ],
      Parola: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(3),
        ],
      ],
      ConfirmParola: [
        '',
        [Validators.required],
      ],
      Nume: ['', [Validators.required]],
      Prenume: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl): Validators | null => {
    const password = formGroup.get('Parola');
    const confirmPassword = formGroup.get('ConfirmParola');
    return password && confirmPassword && password.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
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

  // -------------- form getters ------------------
  get email(): AbstractControl {
    return this.userForm.controls['Email'];
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
