import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../../resources/services/admin/empresa.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomValidator } from '../../../resources/custom-validator';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastroempresa',
  templateUrl: './cadastroempresa.component.html',
  styleUrls: ['./cadastroempresa.component.scss']
})
export class CadastroempresaComponent implements OnInit {

  empresaForm: FormGroup;
  empresaSelecionado: any;

  constructor(private fb: FormBuilder, private empresaService: EmpresaService, private toastr: ToastrService,
    private router: Router) {
    this.empresaSelecionado = this.router.getCurrentNavigation().extras.state
  }

  ngOnInit() {
    console.log('It fill the data in the screen of the employee. ');
    this.empresaForm = this.fb.group({
      fullnamecompany: ['', [Validators.required]],
      _id: [''],
      email: ['', [Validators.email, Validators.required]],
      cnpj: ['', [CustomValidator.isValidCnpj]],
      phones: this.fb.group({
        main: ['', [Validators.required]],
        secundary: [''],
      }),
      address: this.fb.group({
        street: [''],
        complement: [''],
        number: [''],
        zip: [''],
        city: [''],
        district: [''],
        state: [''],
        country: [''],
      })
    });

    if (this.empresaSelecionado) {
      this.empresaForm.patchValue(
        this.empresaSelecionado
      );
    }
  }

  cadastrar() {
    event.preventDefault();

    if (!this.empresaForm.valid) return;

    if (this.empresaSelecionado) {
      this.empresaService.update(this.empresaForm.value)
        .subscribe(() => {
          this.toastr.success('Empresa atualizada com sucesso.');
          this.router.navigate(['/admin/empresamanter']);
        }, err => {
          this.toastr.error('Problema ao atualizar a empresa.' + err.error.msg, 'Erro: ');
        });
    } else {
      let enterprise = (<any>window).user._id;
      this.empresaService.register(this.empresaForm.value, enterprise)
        .subscribe(() => {
          this.toastr.success('Empresa cadastrada com sucesso.');
          this.router.navigate(['/admin/empresamanter']);
        }, err => {
          this.toastr.error('Problema ao cadastrar a empresa. ' + err.keyValue.msg, 'Erro: ');
        });
    }
  }

  voltar() {
    this.router.navigate(['/admin/empresamanter']);
  }
}

