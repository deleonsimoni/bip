import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import * as cep from "cep-promise";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";
@Injectable({
  providedIn: "root",
})
export class UtilService {
  constructor(private http: HttpClient) {}

  public log: any;

  findCep(cependreco: any) {
    return Observable.create((observer) => {
      cep(cependreco.replace("-", "")).then((value) => {
        observer.next(value);
      }, err => {
        observer.error("Este CEP não foi localizado na base do correio.");
      });
    });
  }
}
