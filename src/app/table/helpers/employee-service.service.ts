import { Injectable } from '@angular/core';
import { Observable, Subject, delay, filter, map } from 'rxjs';
import { Employee } from './modals/Employee';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  // get = async () => {

  //   const response = await fetch('http://localhost:3003/getEmployees', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   if (!response.ok) {
  //     console.log('Error');
  //   }
  //   const data = await response.json();
  //   console.log(data);
  //   return data;
  // }

  // add = async (employee: Employee) => {
  //   const response = await fetch('http://localhost:3003/insertEmployee', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(employee),
  //   });

  //   if (!response.ok) {
  //     console.log('Error');
  //   }
  //   return employee;
  // }

  // edit = async (employee: Employee) => {
  //   const response = await fetch('http://localhost:3003/updateEmployee', {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(employee),
  //   });

  //   if (!response.ok) {
  //     console.log('Error');
  //   }
  //   return employee;
  // }

  // delete = async (id: number) => {
  //   const response = await fetch('http://localhost:3003/deleteEmployee', {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ id }),
  //   });

  //   if (!response.ok) {
  //     console.log('Error');
  //   }
  //   return id;
  // }

  getEmployees(): Observable<Employee[]> {
    // Call your API to get the list of jobs
    // Then emit the list of jobs
    return this.httpClient
      .get<Employee[]>('http://localhost:3003/getEmployees')
      .pipe(
        map((employees) => {
          return employees;
        }),
        filter((employees) => employees.length > 0),
        delay(1000)
      );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    // Call your API to add the job
    // Then emit the new job list
    console.log(employee);
    return this.httpClient.post<Employee>('http://localhost:3003/insertEmployee', employee);
  }

  editEmployee(employee: Employee): Observable<Employee> {
    // Call your API to edit the job
    // Then emit the new job list
    return this.httpClient.put<Employee>('http://localhost:3003/updateEmployee', employee);
  }

  deleteEmployee(id: number): Observable<number> {
    // Call your API to delete the job
    // Then emit the new job list
    return this.httpClient.delete<number>('http://localhost:3003/deleteEmployee', { body: { id } });
  }
}