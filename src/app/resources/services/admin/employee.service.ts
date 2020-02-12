import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenStorage } from '../../../auth/token.storage';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  update(employee: any) {
    return Observable.create(observer => {
      this.http.put('/api/employee/', {
        employee
      }).subscribe((data: any) => {
        observer.next(data);
      }, err => {
        observer.error(err.error.msg);
      })
    });
  }

  deleteEmployee(idEmployee: any): Observable<any> {
    return Observable.create(observer => {
      this.http.delete('/api/employee/' + idEmployee, {
      }).subscribe((data: any) => {
        observer.next(data);
      }, err => {
        observer.error(err.error.msg);
      })
    });
  }


  register(employee: any, enterprise): Observable<any> {
    console.log('Lista do empregados ', employee);
    return Observable.create(observer => {
      this.http.post('/api/employee/', {
        employee
        /*,
        enterprise*/
      }).subscribe((data: any) => {
        console.log('Lista do data ', employee);
        observer.next(data);
      }, err => {
        console.log('erro', err.error.msg);
        observer.error(err.error.msg);
      })
    });
  }

  listEmployees(enterprise): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/employee/', {
      }).subscribe((data: any) => {
        console.log('List of the employee.', data);
        observer.next(data);
      }, err => {
        observer.error(err.error.msg);
      })
    });
  }


  listaEmpresas(enterprise): Observable<any> {
    console.log('Entrada no metodo listaEmpresas');
    return Observable.create(observer => {
      this.http.get('/api/company/', {
      }).subscribe((data: any) => {
        observer.next(data);
        console.log('Sucesso ao listar as empresas', data);
      }, err => {
        console.log('Erro ao listar as empresas', err.error.msg);
        observer.error(err.error.msg);
      })
    });
  }


  listAddress(idAddress): Observable<any> {
    console.log('Entrance in the method listAddress.' + idAddress);

    return Observable.create(observer => {
      this.http.get('/api/address/address/' + idAddress, {
      }).subscribe((data: any) => {
        observer.next(data);
        console.log('Success to the list the address. ', data);
      }, err => {
        console.log('Err to the list the address. ', err.error.msg);
        observer.error(err.error.msg);
      })
    });
  }
}