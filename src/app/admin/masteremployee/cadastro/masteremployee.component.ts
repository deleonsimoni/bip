import {Component, OnInit} from '@angular/core';
//import { CarService } from './carservice';
import { StructureEmployee } from './structureemployee';
import { EmployeeService } from '../../../resources/services/admin/employee.service';
import { MasterEmployeeService } from '../../../resources/services/admin/masteremployee.service';

import { ConfirmDialogService } from '../../../resources/modal/confirm/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-masteremployee',
  templateUrl: './masteremployee.component.html'
})

export class MasterEmployeeComponent implements OnInit {
    masteremployeeForm: FormGroup;
    masteremployeeSelected: any;
    todosGrupos: StructureEmployee[];
    gruposSelecionados: StructureEmployee[];
    itensArmazenados: StructureEmployee[];
    itensEncontrados: StructureEmployee[];
    private innerValue: FormGroup;
    private changed = new Array<(value: FormGroup) => void>();
    

    constructor(private fb: FormBuilder, private employeeService: EmployeeService, private masterEmployeeService: MasterEmployeeService,
      private modalConfirm: ConfirmDialogService, private toastr: ToastrService,private router: Router) { 
      this.masteremployeeSelected = this.router.getCurrentNavigation().extras.state;
    }

    ngOnInit() {
      console.log('ngOnInit');
      this.masteremployeeForm = this.fb.group({

      });
      this.listMasterEmployeeRegister();
      this.listMasterEmployee();
      //console.log('Lista dos empregados ', this.employees);
     // this.sourceCars = this.employees;
       /* this.sourceCars = [
          {"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff"},
          {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345"},
          {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr"},
          {"brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh"},
          {"brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34"},
          {"brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj"},
          {"brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr"},
          {"brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg34"},
          {"brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5"},
          {"brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s"}
      ]; */
       // this.targetCars = [];
       this.gruposSelecionados = [];
    }

    register() {
      console.log('This is list employee. ', this.gruposSelecionados);
      event.preventDefault();

      if (!this.masteremployeeForm.valid) return;

    /*  if (this.targetCars) {
        console.log('Register of master and employee 1. ');
        this.employeeService.update(this.masteremployeeForm.value)
          .subscribe(() => {
            this.toastr.success('Funcionário atualizado com sucesso.');
            this.router.navigate(['/admin/supportemployee']);
          }, err => {
            this.toastr.error('Problema ao atualizar o funcionário.' + err.error.msg, 'Erro: ');
          });
      } else {*/
        console.log('Register of master and employee 1. ');
        let enterprise = (<any>window).user._id;
        
        this.masterEmployeeService.registerMasterEmployee(this.masteremployeeForm.value, enterprise, this.gruposSelecionados)
          .subscribe(() => {
            this.toastr.success('Funcionário cadastrado com sucesso.');
            this.router.navigate(['/admin/usuarioselecionar']);
          }, err => {
            this.toastr.error('Problema ao cadastrar o funcionário. ', 'Erro: ');
          });
     // }

    }
    
    return() {
      this.router.navigate(['/admin/manterusuarioselecionar']);
    }

    listMasterEmployee() {
      let enterprise = (<any>window).user._id;
      let intNuContador;
      this.employeeService.listMasterEmployee(enterprise)
        .subscribe(data => {
            this.itensEncontrados = data;
            console.log('this.itensEncontrados ', this.itensEncontrados);
            console.log('this.itensArmazenados ', this.itensArmazenados);
            for(let elementStore of this.itensArmazenados){
                console.log('elementStore userId ', elementStore['userId']);
                intNuContador = 0;
                for (let elementFind of this.itensEncontrados) {
                  if (elementStore['userId'] == elementFind['_id']) {
                          this.itensEncontrados.splice(intNuContador, 1);
                  }
                  intNuContador++;
                }
            }
            console.log('this.itensEncontrados ', this.itensEncontrados);
            this.todosGrupos = this.itensEncontrados;

         }, err => {
          this.toastr.error('Problema ao consultar o funcionário. ' + err.error.msg, 'Erro: ');
        });
    }
    
    listMasterEmployeeRegister() {
      let enterprise = (<any>window).user._id;
      this.masterEmployeeService.listMasterEmployee(enterprise)
        .subscribe(data => {
          console.log('informações dos dados ', data);
          this.itensArmazenados = data;
        
          console.log('informações de todos os empregados ', this.gruposSelecionados);
        }, err => {
          this.toastr.error('Problema ao consultar o funcionário. ' + err.error.msg, 'Erro: ');
        });
    }
}

