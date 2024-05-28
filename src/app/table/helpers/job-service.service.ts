import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private jobs = new Subject<any>();

  getJobs() {
    return this.jobs.asObservable();
  }

  addJob(job: any) {
    // Call your API to add the job
    // Then emit the new job list
    this.jobs.next(job);
  }
}