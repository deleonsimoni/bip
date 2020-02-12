import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenStorage } from '../../../auth/token.storage';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  updateAddress(address: any) {
    return Observable.create(observer => {
      this.http.put('/api/address/', {
        address
      }).subscribe((data: any) => {
        observer.next(data);
      }, err => {
        observer.error(err.error.msg);
      })
    });
  }

  deleteAddress(idAddress: any): Observable<any> {
    return Observable.create(observer => {
      this.http.delete('/api/address/' + idAddress, {
      }).subscribe((data: any) => {
        observer.next(data);
      }, err => {
        observer.error(err.error.msg);
      })
    });
  }


  registerAddress(address: any, enterprise): Observable<any> {
    console.log('It list of the address. ', address);
    return Observable.create(observer => {
      this.http.post('/api/address/', {
        address
        /*,
        enterprise*/
      }).subscribe((data: any) => {
        console.log('It list of the data. ', address);
        observer.next(data);
      }, err => {
        console.log('erro', err.error.msg);
        observer.error(err.error.msg);
      })
    });
  }

  listAddress(address): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/address/', {
      }).subscribe((data: any) => {
        console.log('List of the employee.', data);
        observer.next(data);
      }, err => {
        observer.error(err.error.msg);
      })
    });
  }

}