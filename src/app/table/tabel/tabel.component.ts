import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormularComponent } from '../formular/formular.component';
import { Employee } from '../helpers/modals/Employee';
import { EmployeeService } from '../helpers/employee-service.service';
import { BehaviorSubject, delay } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NzTableFilterFn, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { DetailsComponent } from '../details/details.component';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<Employee> | null;
  sortDirections: NzTableSortOrder[];
  filterFn: NzTableFilterFn<Employee> | null;
};

@Component({
  selector: 'app-tabel',
  templateUrl: './tabel.component.html',
  styleUrls: ['./tabel.component.scss']
})

export class TabelComponent implements OnInit {
  @Output() pageIndexChange = new EventEmitter<number>();

  userName!: string;

  sortOrder!: string | null;

  employees: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);
  originalEmployees: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);
  isLoaded: boolean = false;

  searchText: string = '';
  selectedColumn: string = 'Nume';

  listOfColumns: ColumnItem[] = [
    {
      name: 'Nume',
      sortOrder: null,
      sortFn: (a: Employee, b: Employee) => a.nume.localeCompare(b.nume),
      sortDirections: ['ascend', 'descend', null],
      filterFn: (list: string[], item: Employee) => list.some(name => item.nume.toLowerCase().indexOf(name.toLowerCase()) !== -1)
    },
    {
      name: 'Prenume',
      sortOrder: null,
      sortFn: (a: Employee, b: Employee) => a.prenume.localeCompare(b.prenume),
      sortDirections: ['ascend', 'descend', null],
      filterFn: (list: string[], item: Employee) => list.some(prenume => item.prenume.toLowerCase().indexOf(prenume.toLowerCase()) !== -1)
    },
    {
      name: 'Email',
      sortOrder: null,
      sortFn: (a: Employee, b: Employee) => a.email.localeCompare(b.email),
      sortDirections: ['ascend', 'descend', null],
      filterFn: (list: string[], item: Employee) => list.some(email => item.email.toLowerCase().indexOf(email.toLowerCase()) !== -1)
    },
    {
      name: 'Telefon',
      sortOrder: null,
      sortFn: (a: Employee, b: Employee) => a.telefon.localeCompare(b.telefon),
      sortDirections: ['ascend', 'descend', null],
      filterFn: (list: string[], item: Employee) => list.some(telefon => item.telefon.indexOf(telefon) !== -1)
    },
    {
      name: 'Functie',
      sortOrder: null,
      sortFn: (a: Employee, b: Employee) => a.functie.localeCompare(b.functie),
      sortDirections: ['ascend', 'descend', null],
      filterFn: (list: string[], item: Employee) => list.some(functie => item.functie.toLowerCase().indexOf(functie.toLowerCase()) !== -1)
    },
  ];

  pageIndex = 1;

  constructor(private modalService: NzModalService, private employeeService: EmployeeService,
    private messageService: NzMessageService, private authService: AuthService
  ) { }

  ngOnInit() {
    this.getEmployees();
    console.log(this.employees);
    this.userName = this.authService.getUserName();
  }

  filterData(searchText: string) {
    if (searchText === '') {
      // When the search bar is cleared, reset the employees to the original list
      this.employees.next(this.originalEmployees.getValue());
    } else {
      // Get the column with the name selectedColumn
      const selectedColumn = this.listOfColumns.find(column => column.name === this.selectedColumn);
      console.log(selectedColumn);

      if (selectedColumn) {
        this.employees.next(
          this.originalEmployees.getValue().filter(employee =>
            selectedColumn.filterFn && selectedColumn.filterFn([searchText], employee)
          )
        );
      }
    }
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.isLoaded = true;
        this.employees.next(employees);
        this.originalEmployees.next(employees);
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

  openDetailsModal(employee: Employee) {
    const modal = this.modalService.create({
      nzTitle: 'Employee Details',
      nzContent: DetailsComponent,
      nzData: { employee: employee },
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

  changePage(index: number) {
    this.pageIndexChange.emit(index);
  }

  handlePageIndexChange(index: number) {
    this.pageIndex = index;
  }

  logout() {
    this.authService.logOut();
  }
}
