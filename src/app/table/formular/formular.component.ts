import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../helpers/job-service.service';


@Component({
  selector: 'app-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.scss']
})
export class FormularComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder, private jobService: JobService) { }

  ngOnInit(): void {
    this.createForm();
    console.log(this.form);
  }

  createForm(): void {
    this.form = this.fb.group({
      nume: [null, [Validators.required]],
      prenume: [null, [Validators.required]],
    });
  }

  addJob = async (event: any) => {
    console.log('Form values', this.form.value);
    event.preventDefault();

    const response = await fetch('http://localhost:3003/insertEmployee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.form.value),
    });

    if (response.ok) {
      this.jobService.addJob(this.form.value);
    }
    else {
      console.log('Error');
    }
  };

  add() {
    console.log('Form values', this.form.value);
    this.addJob(event);
  }
}
