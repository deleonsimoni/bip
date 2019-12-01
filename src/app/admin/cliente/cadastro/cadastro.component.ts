import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/admin/cliente.service';
import { HttpClient } from '@angular/common/http';
import { TokenStorage } from '../../../auth/token.storage';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  clienteForm: FormGroup;

  constructor(private http : HttpClient, private token: TokenStorage, private fb: FormBuilder, private clienteService: ClienteService) {}

  ngOnInit() {
    this.clienteForm = this.fb.group({
      fullname: ['', [Validators.required]],
      email: [''],
      cnpj: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      phones: this.fb.group({
        main: ['', [Validators.required]],
        secundary: ['', [Validators.required]],
      }),
      address: this.fb.group({
        main: [''],
        secundary: [''],
        street: [''],
        complement: [''],
        num: [''],
        zip: [''],
        city: [''],
        district: [''],
        state: [''],
        country: [''],
      })
    });
  }

  cadastrar() {
    if(!this.clienteForm.valid) return;

    this.clienteService.register(this.clienteForm.value)
    .subscribe(data => {
      alert("Cadastrado com sucesso" + data);
    });

    event.preventDefault();
  }
}