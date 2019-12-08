import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenStorage } from '../../../auth/token.storage';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http : HttpClient, private token: TokenStorage) {}

  register(cliente: any, enterprise) : Observable <any> {
    return Observable.create(() => {
      this.http.post('/api/client/', {
        cliente,
        enterprise
      }).subscribe((data : any) => {
        return data;
      }, err => {
        this.toastr.error('Email ou senha inválidos', 'Erro: ' + err);
      })
    });
  }

  listaClientes() : Observable <any> {
    return Observable.create(() => {
      this.http.get('/api/client/enterprise', {
      }).subscribe((data : any) => {
        console.log(data);
      })
    });
  }
}