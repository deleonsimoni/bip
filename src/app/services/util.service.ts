import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as cep from 'cep-promise';
@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) { }

  findCep(cependreco: any) {

    cep(cependreco.replace('-', '')).then(cep => { return cep });

    //  return Observable.create(observer => {
    //     this.http.get('http://viacep.com.br/ws/' + cep.replace('-', '') + '/json').subscribe((data: any) => {
    //       observer.next(data);
    //     }, err => {
    //       observer.error(err.error.msg);
    //     })
    //   });

  }

}
