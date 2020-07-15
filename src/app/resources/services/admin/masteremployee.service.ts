import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pais } from '../../../admin/masteremployee/backlog/pais';
import { Cidade } from '../../../admin/masteremployee/backlog/cidade';

@Injectable({
  providedIn: 'root'
})
export class MasterEmployeeService {

  getPaises() {
    return [
      new Pais(1, 'Brasil'),
      new Pais(2, 'USA'),
      new Pais(3, 'Itália')
    ];
  }
  getCidades() {
    return [
      new Cidade(1, 1, 'São Paulo'),
      new Cidade(2, 1, 'Brasília'),
      new Cidade(3, 1, 'Rio de Janeiro'),
      new Cidade(4, 1, 'Santos'),
      new Cidade(5, 2, 'New Yord'),
      new Cidade(6, 2, 'Chicago'),
      new Cidade(7, 2, 'Los Angeles'),
      new Cidade(8, 3, 'Roma'),
      new Cidade(9, 3, 'Florença'),
      new Cidade(10, 3, 'Veneza')
    ];
  }


  constructor(private http: HttpClient) { }

  updateMasterEmployee(masterEmployee: any) {
    return Observable.create(observer => {
      this.http.put('/api/masteremployee/', {
        masterEmployee
      }).subscribe((data: any) => {
        observer.next(data);
      }, err => {
        observer.error(err.error.msg);
      })
    });
  }

  deleteMasterEmployee(masterEmployeeId: any): Observable<any> {
    return Observable.create(observer => {
      this.http.delete('api/masteremployee/' + masterEmployeeId, {
      }).subscribe((data: any) => {
        observer.next(data);
      }, err => {
        observer.error(err.error.msg);
      })
    });
  }

  registerMasterEmployee(masterEmployee: any, enterprise, targetCars: any[]): Observable<any> {
    console.log('Show the register1. ', masterEmployee);
    console.log('Show the register2. ', enterprise);
    console.log('Show the register3. ', targetCars);
    
    return Observable.create(observer => {
      this.http.post('/api/masteremployee/',  {
        masterEmployee,
        enterprise,
        targetCars
      }).subscribe((data: any) => {
        console.log('List in the data ', masterEmployee);
        observer.next(data);
      }, err => {
        console.log('message of error ', err.error.msg);
        observer.error(err.error.msg);
      })
    });
  }

  listMasterEmployee(enterprise): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/masteremployee/' + enterprise, {
      }).subscribe((data: any) => {
        observer.next(data);
        console.log('Sucesso ao listar as clientes', data);
      }, err => {
        console.log('Erro ao listar as clientes', err.error.msg);
        observer.error(err.error.msg);
      })
    });
  }

}