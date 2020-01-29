import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../resources/services/admin/employee.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomValidator } from '../../../resources/custom-validator';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registeremployee',
  templateUrl: './registeremployee.component.html',
  styleUrls: ['./registeremployee.component.scss']
})
export class RegisteremployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employeeSelected: any;
  empresas: [any];

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private toastr: ToastrService,
    private router: Router) {
      this.employeeSelected = this.router.getCurrentNavigation().extras.state;
  }
   

    ngOnInit() {

        this.employeeForm = this.fb.group({
          fullname: ['', [Validators.required]],
          _id: [''],
          email: ['', [Validators.email, Validators.required]],
          cpf: ['', [CustomValidator.isValidCpf]],
          phones: this.fb.group({
            main: ['', [Validators.required]],
            secundary: [''],
          }),

          idcompany: [''],
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
    
        if (this.employeeSelected){
          this.employeeForm.patchValue(
            this.employeeSelected
          );
        }
        this.listar();

      }
    
      register() {
        event.preventDefault();
    
        if(!this.employeeForm.valid) return;
    
        if (this.employeeSelected){
          this.employeeService.update(this.employeeForm.value)
          .subscribe(() => {
            this.toastr.success('Funcionário atualizada com sucesso');
            this.router.navigate(['/admin/supportemployee']);
          }, err => {
              this.toastr.error(''  + err, 'Erro: ');
          });
        } else {
          let enterprise = (<any>window).user._id;
          this.employeeService.register(this.employeeForm.value, enterprise)
          .subscribe(() => {
            this.toastr.success('Funcionário cadastrada com sucesso');
            this.router.navigate(['/admin/supportemployee']);
          }, err => {
              this.toastr.error('Email já cadastrado ', 'Erro: ');
          });
        }
      }
  
      return(){
        this.router.navigate(['/admin/supportemployee']);
      }

      listar(){
        console.log('Listar Empresa');
        let userId = (<any>window).user._id;
        this.employeeService.listaEmpresas(userId)
        .subscribe(data => {
          console.log('Listar Empresa: ',data);
           this.empresas = data;
        }, err => {
          this.toastr.error('Problemas ao consultar a lista de empresa. '  + err.error.msg);
      });
      }
    }
