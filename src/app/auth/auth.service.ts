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
        this.router.navigate(['home']);
      }, err => {
        if (err.status === 401) {
          this.toastr.error('Email ou senha inválidos', 'Erro: ');
        }
      });
    });
  }

  register(fullname: string, email: string, cpf: string, password: string, repeatPassword: string): Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/auth/register', {
        fullname,
        email,
        cpf,
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
    if (user) user.isAdmin = (user.roles.indexOf('admin') > -1);
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
