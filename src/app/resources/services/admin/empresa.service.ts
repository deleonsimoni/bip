import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenStorage } from '../../../auth/token.storage';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  update(empresa: any) {
    return Observable.create(observer => {
      this.http.put('/api/company/', {
        empresa
      }).subscribe((data: any) => {
        observer.next(data);
      }, err => {
        observer.error(err.error.msg);
      })
    });
  }

  deletarEmpresa(idEmpresa: any): Observable<any> {
    return Observable.create(observer => {
      this.http.delete('/api/company/' + idEmpresa, {
      }).subscribe((data: any) => {
        observer.next(data);
      }, err => {
        observer.error(err.error.msg);
      })
    });
  }

  register(empresa: any, enterprise): Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/company/', {
        empresa/*,
        enterprise*/
      }).subscribe((data: any) => {
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

  totalCompany(userId): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/dashboard/totalCompany/' + userId, {
      }).subscribe((data: any) => {
        observer.next(data);
      }, err => {
        observer.error(err.error.msg);
      })
    });
  }

}