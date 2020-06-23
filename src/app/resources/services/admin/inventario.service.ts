import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http: HttpClient) { }

  update(inventary: any) {
    return Observable.create(observer => {
      this.http.put('/api/inventary/', {
        inventary
      }).subscribe((data: any) => {
        observer.next(data);
      }, err => {
        observer.error(err.error.msg);
      })
    });
  }

  deleteInventary(idInventary: any): Observable<any> {
    return Observable.create(observer => {
      this.http.delete('/api/inventary/' + idInventary, {
      }).subscribe((data: any) => {
        observer.next(data);
      }, err => {
        observer.error(err.error.msg);
      })
    });
  }


  register(inventary: any): Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/inventary/', {
        inventary
      }).subscribe((data: any) => {
        observer.next(data);
      }, err => {
        console.log('erro', err.error.msg);
        observer.error(err.error.msg);
      })
    });
  }

  listInventaries(): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/inventary/', {
      }).subscribe((data: any) => {
        observer.next(data);
      }, err => {
        observer.error(err.error.msg);
      })
    });
  }

  totalInventaries(userId): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/dashboard/totalInventary/' + userId, {
      }).subscribe((data: any) => {
        observer.next(data);
      }, err => {
        observer.error(err.error.msg);
      })
    });
  }
}