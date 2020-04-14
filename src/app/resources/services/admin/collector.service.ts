import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CollectorService {

  constructor(private http: HttpClient) { }

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