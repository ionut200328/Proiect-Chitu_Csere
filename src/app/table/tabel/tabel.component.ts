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

  pageIndex = 1;

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

  addEmployee() {
    const modal = this.modalService.create({
      nzTitle: 'Add Employee',
      nzContent: FormularComponent,
      nzData: { isEdit: false, employee: {} as Employee },
    });

    modal.afterClose.subscribe(() => {
      this.getEmployees();
    });

  }

  editEmployee(employee: Employee) {
    const modal = this.modalService.create({
      nzTitle: 'Edit Employee',
      nzContent: FormularComponent,
      nzData: { isEdit: true, employee: employee },
    });
    modal.afterClose.subscribe(() => {
      this.getEmployees();
    });
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.messageService.success('Employee deleted successfully');
        this.getEmployees();
      },
      error: () => {
        this.messageService.error('Error deleting employee');
      }
    });
  }

  onPageChange(pageIndex: number) {
    this.pageIndex = pageIndex;
  }
}
