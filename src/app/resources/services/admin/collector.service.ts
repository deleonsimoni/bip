import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CollectorService {

  constructor(private http: HttpClient) { }

  deletar(idCliente: any): Observable<any> {
    return Observable.create(observer => {
      this.http.delete('api/collector/' + idCliente, {
      }).subscribe((data: any) => {
        observer.next(data);
      }, err => {
        observer.error(err.error.msg);
      })
    });
  }

  register(collector: any): Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/collector/', {
        collector
      }).subscribe((data: any) => {
        observer.next(data);
      }, err => {
        observer.error(err.error.msg);
      })
    });
  }

  listar(): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/collector', {
      }).subscribe((data: any) => {
        observer.next(data);
      }, err => {
        observer.error(err.error.msg);
      })
    });
  }

}