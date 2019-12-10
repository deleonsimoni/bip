import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../resources/services/admin/cliente.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomValidator } from '../../../resources/custom-validator';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  clienteForm: FormGroup;
  clienteSelecionado: any;

  constructor(private fb: FormBuilder, private clienteService: ClienteService, private toastr: ToastrService,
    private router: Router) {
      this.clienteSelecionado = this.router.getCurrentNavigation().extras.state
    }

  ngOnInit() {
    this.clienteForm = this.fb.group({
      fullname: ['', [Validators.required]],
      _id: ['', []],
      email: ['', [Validators.email, Validators.required]],
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

    if (this.clienteSelecionado){
      this.clienteForm.patchValue(
        this.clienteSelecionado
      );
    }
  }

  cadastrar() {
    event.preventDefault();

    if(!this.clienteForm.valid) return;

    if (this.clienteSelecionado){
      this.clienteService.update(this.clienteForm.value)
      .subscribe(() => {
        this.toastr.success('Cliente atualizado com sucesso');
        this.router.navigate(['/admin/clientemanter']);
      }, err => {
          this.toastr.error(''  + err, 'Erro: ');
      });
    } else {
      let enterprise = (<any>window).user._id;
      this.clienteService.register(this.clienteForm.value, enterprise)
      .subscribe(() => {
        this.toastr.success('Cliente cadastrado com sucesso');
        this.router.navigate(['/admin/clientemanter']);
      }, err => {
          this.toastr.error('Email já cadastrado '  + err.keyValue.email, 'Erro: ');
      });
    }
  }
}