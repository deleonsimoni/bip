import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../resources/services/admin/cliente.service';
import { HttpClient } from '@angular/common/http';
import { TokenStorage } from '../../../auth/token.storage';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomValidator } from '../../../resources/custom-validator';

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
      cpf: ['', [Validators.required, CustomValidator.isValidCpf]],
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
    event.preventDefault();

    if(!this.clienteForm.valid) return;

    this.clienteService.register(this.clienteForm.value)
    .subscribe(data => {
      alert("Cadastrado com sucesso" + data);
    });
  }
}