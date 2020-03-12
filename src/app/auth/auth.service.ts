import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ToastrService } from 'ngx-toastr';
import { TokenStorage } from './token.storage';
import { TooltipComponent } from '@angular/material';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private token: TokenStorage,
    private toastr: ToastrService,
    private router: Router

  ) { }

  public $userSource = new Subject<any>();

  login(email: string, password: string): Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/auth/login', {
        email,
        password
      }).subscribe((data: any) => {
        observer.next({ user: data.user });
        this.setUser(data.user);
        this.token.saveToken(data.token);
        observer.complete();
        window.location.assign("/admin");
      }, err => {
        if (err.status === 401) {
          this.toastr.error('Email ou senha inválidos', 'Erro: ');
        }
      });
    });
  }

  register(user: any): Observable<any> {
    console.log('List the user ', user);
    return Observable.create(observer => {
      this.http.post('/api/auth/register/', {
        user
      }).subscribe((data: any) => {
        console.log('List in the data ', user);
        observer.next({ user: data.user });
        this.setUser(data.user);
        this.token.saveToken(data.token);
        observer.complete();
      }, err => {
        console.log('message of error  ', err.error.msg);
        observer.error(err.error.msg);
      })
    });
  }

  register_old(fullname: string, email: string, cpf: string, main: string,
    secundary: string, street: string, complement: string, number: string,
    zip: string, city: string, district: string, state: string,
    country: string, password: string, repeatPassword: string): Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/auth/register', {
        fullname,
        email,
        cpf,
        main,
        secundary,
        street,
        complement,
        number,
        zip,
        city,
        district,
        state,
        country,
        password,
        repeatPassword
      }).subscribe((data: any) => {
        observer.next({ user: data.user });
        this.setUser(data.user);
        this.token.saveToken(data.token);
        observer.complete();
      })
    });
  }

  setUser(user): void {
    //if (user) user.isAdmin = (user.roles.indexOf('admin') > -1);
    this.$userSource.next(user);
    (<any>window).user = user;
  }

  getUser(): Observable<any> {
    return this.$userSource.asObservable();
  }

  me(): Observable<any> {
    return Observable.create(observer => {
      const tokenVal = this.token.getToken();
      if (!tokenVal) return observer.complete();
      this.http.get('/api/auth/me').subscribe((data: any) => {
        observer.next({ user: data.user });
        this.setUser(data.user);
        observer.complete();
      })
    });
  }

  signOut(): void {
    this.token.signOut();
    this.setUser(null);
    delete (<any>window).user;
  }
}
