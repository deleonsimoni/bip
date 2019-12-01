import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenStorage } from '../../../auth/token.storage';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http : HttpClient, private token: TokenStorage) {}

  register(cliente: any) : Observable <any> {
    return Observable.create(observer => {
      this.http.post('/api/client/', {
        cliente
      }).subscribe((data : any) => {
        console.log(data);
      })
    });
  }

  listaClientes() : Observable <any> {
    return Observable.create(observer => {
      this.http.get('/api/client/enterprise', {
      }).subscribe((data : any) => {
        console.log(data);
      })
    });
  }
}