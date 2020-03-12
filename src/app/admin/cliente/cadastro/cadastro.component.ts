import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../resources/services/admin/cliente.service';
import { EmployeeService } from '../../../resources/services/admin/employee.service';
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
  address: any[];

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private clienteService: ClienteService, private toastr: ToastrService,
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
      idaddress: [''],
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

    if (this.clienteSelecionado) {
      this.clienteForm.patchValue(
        this.clienteSelecionado
      );
      console.log('List all the address.');
      this.listAddress();
    }
  }

  cadastrar() {
    event.preventDefault();

    if (!this.clienteForm.valid) return;

    if (this.clienteSelecionado) {
      this.clienteService.update(this.clienteForm.value)
        .subscribe(() => {
          this.toastr.success('Cliente atualizado com sucesso.');
          this.router.navigate(['/admin/clientemanter']);
        }, err => {
          this.toastr.error('Problema ao atualizar o cliente. ' + err.keyValue.msg, 'Erro: ');
        });
    } else {
      let enterprise = (<any>window).user._id;
      this.clienteService.register(this.clienteForm.value, enterprise)
        .subscribe(() => {
          this.toastr.success('Cliente cadastrado com sucesso.');
          this.router.navigate(['/admin/clientemanter']);
        }, err => {
          this.toastr.error('Problema ao cadastrar o cliente. ' + err.keyValue.msg, 'Erro: ');
        });
    }
  }

  listAddress() {
    console.log('It list address. It entrance in the method. ');
    let Address: any = this.clienteForm.get('idaddress').value;
    console.log('Value of the field. ' + Address);
    this.employeeService.listAddress(Address)
      .subscribe(data => {
        console.log('It list address: ', data);
        this.address = data;
      }, err => {
        this.toastr.error('Problemas ao consultar a lista de endereço. ', 'Erro: ');
      });
  }

  voltar() {
    this.router.navigate(['/admin/clientemanter']);
  }
}