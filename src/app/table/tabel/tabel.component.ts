import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormularComponent } from '../formular/formular.component';
import { Jobs } from '../helpers/modals/Jobs';
import { waitForAsync } from '@angular/core/testing';
import { JobService } from '../helpers/job-service.service';

@Component({
  selector: 'app-tabel',
  templateUrl: './tabel.component.html',
  styleUrls: ['./tabel.component.scss']
})
export class TabelComponent {

  jobs: Jobs[] = [];

  constructor(private modalService: NzModalService, private jobService: JobService) { }

  addJob() {
    this.modalService.create({
      nzTitle: 'Add User',
      nzContent: FormularComponent
    });
    //wait for the modal to close
    waitForAsync(() => {
      this.get();
    });
  }

  getJobs = async () => {

    const response = await fetch('http://localhost:3003/getEmployees', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      console.log('Error');
    }
    const data = await response.json();
    return data;
  }

  ngOnInit() {
    this.jobService.getJobs().subscribe((jobs) => {
      this.jobs = jobs;
    });
  }

  async get() {
    this.jobs = await this.getJobs();
    console.log(this.jobs);
  }
}
