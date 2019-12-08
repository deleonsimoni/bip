import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../resources/services/admin/cliente.service';
import { HttpClient } from '@angular/common/http';
import { TokenStorage } from '../../../auth/token.storage';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomValidator } from '../../../resources/custom-validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  clienteForm: FormGroup;

  constructor(private fb: FormBuilder, private clienteService: ClienteService,private toastr: ToastrService) {}

  ngOnInit() {
    this.clienteForm = this.fb.group({
      fullname: ['', [Validators.required]],
      email: [''],
      cnpj: ['', [CustomValidator.isValidCnpj]],
      cpf: ['', [CustomValidator.isValidCpf]],
      phones: this.fb.group({
        main: ['', [Validators.required]],
        secundary: [''],
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

    let enterprise = (<any>window).user._id;
    this.clienteService.register(this.clienteForm.value, enterprise)
    .subscribe(() => {
      this.toastr.success('Cliente cadastrado com sucesso');
    }, err => {
        this.toastr.error('Email ou senha inválidos', 'Erro: ' + err);
    });
  }
}