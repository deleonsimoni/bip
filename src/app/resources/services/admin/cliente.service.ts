import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenStorage } from '../../../auth/token.storage';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  update(cliente: any) {
    return Observable.create(observer => {
      this.http.put('/api/client/', {
        cliente
      }).subscribe((data: any) => {
        observer.next(data);
      }, err => {
        observer.error(err.error.msg);
      })
    });
  }

  deletarCliente(idCliente: any): Observable<any> {
    return Observable.create(observer => {
      this.http.delete('api/client/' + idCliente, {
      }).subscribe((data: any) => {
        observer.next(data);
      }, err => {
        observer.error(err.error.msg);
      })
    });
  }

  register(cliente: any, enterprise): Observable<any> {
    console.log('Show the register.');
    return Observable.create(observer => {
      this.http.post('/api/client/', {
        cliente,
        enterprise
      }).subscribe((data: any) => {
        console.log('List in the data ', cliente);
        observer.next(data);
      }, err => {
        console.log('message of error ', err.error.msg);
        observer.error(err.error.msg);
      })
    });
  }

  listaClientes(enterprise): Observable<any> {
    return Observable.create(observer => {
      //this.http.get('/api/client/enterprise/' + enterprise, {
      this.http.get('/api/client/', {
      }).subscribe((data: any) => {
        observer.next(data);
        console.log('Sucesso ao listar as clientes', data);
      }, err => {
        console.log('Erro ao listar as clientes', err.error.msg);
        observer.error(err.error.msg);
      })
    });
  }

  listarClientesMatriz(): Observable<any> {
    return Observable.create(observer => {
      //this.http.get('/api/client/enterprise/' + enterprise, {
      this.http.get('/api/client/typeClient/', {
      }).subscribe((data: any) => {
        observer.next(data);
        console.log('Sucesso ao listar as matrizes dos clientes', data);
      }, err => {
        console.log('Erro ao listar as matrizes dos clientes', err.error.msg);
        observer.error(err.error.msg);
      })
    });
  }

  totalClients(userId): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/dashboard/totalClients/' + userId, {
      }).subscribe((data: any) => {
        observer.next(data);
      }, err => {
        observer.error(err.error.msg);
      })
    });
  }


}