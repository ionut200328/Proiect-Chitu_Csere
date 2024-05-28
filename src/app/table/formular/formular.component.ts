import { Component, Inject, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { EmployeeService } from '../helpers/employee-service.service';
import { LetterValidator, NumberValidator } from '../helpers/form.helper';
import { Employee } from '../helpers/modals/Employee';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.scss']
})
export class FormularComponent implements OnInit {
  @Input() employee: Employee = {} as Employee;
  @Input() isEdit: boolean = false;

  readonly nzModalData = inject(NZ_MODAL_DATA);

  form: FormGroup = this.fb.group({
    nume: ['', [Validators.required, LetterValidator]],
    prenume: ['', [Validators.required, LetterValidator]],
    email: ['', [Validators.required, Validators.email]],
    telefon: ['', [Validators.required, NumberValidator]],
    functie: ['', [Validators.required, LetterValidator]],
  });

  constructor(private fb: FormBuilder, private employeeService: EmployeeService,
    private messageService: NzMessageService, private modalRef: NzModalRef) { }

  ngOnInit(): void {
    this.isEdit = this.nzModalData.isEdit;
    this.employee = this.nzModalData.employee;
    this.createForm(this.employee);
  }

  createForm(employee?: Employee): void {
    console.log(employee);
    this.form.setValue({
      nume: employee?.nume || '',
      prenume: employee?.prenume || '',
      email: employee?.email || '',
      telefon: employee?.telefon || '',
      functie: employee?.functie || '',
    });
  }

  addEmployee(): void {
    if (this.form.valid) {
      this.employeeService.addEmployee(this.form.value).subscribe({
        next: () => {
          this.messageService.success('Employee added successfully');
          this.modalRef.close();
        },
        error: () => {
          this.messageService.error('Error adding employee');
        }
      });
    }
  }

  editEmployee(): void {
    if (this.form.valid) {
      this.employeeService.editEmployee(this.form.value).subscribe({
        next: () => {
          this.messageService.success('Employee edited successfully');
          this.modalRef.close();
        },
        error: () => {
          this.messageService.error('Error editing employee');
        }
      });
    }
  }

  get nume(): AbstractControl {
    return this.form.get('nume') as AbstractControl;
  }

  get prenume(): AbstractControl {
    return this.form.get('prenume') as AbstractControl;
  }

  get email(): AbstractControl {
    return this.form.get('email') as AbstractControl;
  }

  get telefon(): AbstractControl {
    return this.form.get('telefon') as AbstractControl;
  }

  get functie(): AbstractControl {
    return this.form.get('functie') as AbstractControl;
  }
}

