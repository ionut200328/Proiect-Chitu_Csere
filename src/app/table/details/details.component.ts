import { Component, Input, OnInit, inject } from '@angular/core';
import { Employee } from '../helpers/modals/Employee';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() employee: Employee = {} as Employee;

  readonly nzModalData = inject(NZ_MODAL_DATA);

  ngOnInit(): void {
    this.employee = this.nzModalData.employee;
  }
}