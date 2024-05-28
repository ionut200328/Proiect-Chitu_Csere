import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormularComponent } from '../formular/formular.component';
import { Employee } from '../helpers/modals/Employee';
import { waitForAsync } from '@angular/core/testing';
import { EmployeeService } from '../helpers/employee-service.service';
import { BehaviorSubject } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-tabel',
  templateUrl: './tabel.component.html',
  styleUrls: ['./tabel.component.scss']
})
export class TabelComponent implements OnInit {

  employees: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);
  isLoaded: boolean = false;

  constructor(private modalService: NzModalService, private employeeService: EmployeeService,
    private messageService: NzMessageService
  ) { }

  ngOnInit() {
    this.getEmployees();
    console.log(this.employees);
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.isLoaded = true;
        this.employees.next(employees);
        this.messageService.success('Employees loaded successfully');
      },
      error: () => {
        this.messageService.error('Error loading employees');
      }
    });
  }

  addJob() {
    this.modalService.create({
      nzTitle: 'Add Employee',
      nzContent: FormularComponent,
      nzData: { isEdit: false, employee: {} as Employee },
    });
    //wait for the modal to close
  }


}
