import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenStorage } from '../../../auth/token.storage';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  constructor(private http : HttpClient) {}
  
  update(employee: any) {
    return Observable.create(observer => {
      this.http.put('/api/employee/', {
        employee
      }).subscribe((data : any) => {
        observer.next(data) ;
      }, err => {
        observer.error(err.error.msg);
      })
    });
  }
  
  deleteEmployee(idEmployee: any): Observable <any> {
    return Observable.create(observer => {
      this.http.delete('/api/employee/' + idEmployee, {
      }).subscribe((data : any) => {
        observer.next(data) ;
      }, err => {
        observer.error(err.error.msg);
      })
    });
  }

  
  register(employee: any, enterprise) : Observable <any> {
    return Observable.create(observer => {
      this.http.post('/api/employee/', {
        employee
        /*,
        enterprise*/
      }).subscribe((data : any) => {
        observer.next(data) ;
      }, err => {
        observer.error(err.error.msg);
      })
    });
  }

  listEmployees(enterprise) : Observable <any> {
    return Observable.create(observer => {
      this.http.get('/api/employee/', {
      }).subscribe((data : any) => {
        observer.next(data) ;
      }, err => {
        observer.error(err.error.msg);
      })
    });
  }
}