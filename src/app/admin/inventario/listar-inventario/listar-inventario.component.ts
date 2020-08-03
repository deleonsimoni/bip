import { Component, OnInit } from '@angular/core';
//import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import {FormControl} from '@angular/forms';
import { InventarioService } from '../../../resources/services/admin/inventario.service';
import { ConfirmDialogService } from '../../../resources/modal/confirm/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth/auth.service';
import { ClienteService } from '../../../resources/services/admin/cliente.service';
import { EmployeeService } from '../../../resources/services/admin/employee.service';
import { CollectorService } from '../../../resources/services/admin/collector.service';
//import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { AppDateAdapter, APP_DATE_FORMATS} from './date.adapter';

@Component({
  selector: 'app-listar-inventario',
  templateUrl: './listar-inventario.component.html',
  styleUrls: ['./listar-inventario.component.scss'],
  providers: [{
        provide: DateAdapter, useClass: AppDateAdapter},
    {   provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }]
  
})
export class ListarInventarioComponent implements OnInit {

  public inventaries = [];
  public inventarySelected;
  public clients = [];
  public employees = [];
  public collectors = [];
  public employeColectors = [];
  private files: FileList;
  public inventaryRequest: any = {};
  public selectedFile: any;
      

  employeSelect: any;
  collectorSelect: any;


  constructor(private inventarioService: InventarioService,
    private authService: AuthService,
    private clienteService: ClienteService,
    private modalConfirm: ConfirmDialogService,
    private toastr: ToastrService,
    private employeeService: EmployeeService,
    private inventaryService: InventarioService,
    private collectorService: CollectorService,

  ) {

  }

  ngOnInit() {

    if (!(<any>window).user) {
      this.authService.me().subscribe(data => {
        this.list();
      });
    } else {
      this.list();
    }
  }

  deleteInventary(idInventary) {
    this.modalConfirm.confirm('Deletar', 'Confirma a deleção?')
      .then(() =>
        this.inventarioService.deleteInventary(idInventary)
          .subscribe(data => {
            this.list();
            this.toastr.success('Inventário deletado com sucesso');
          }, err => {
            this.toastr.error('' + err, 'Erro: ');
          })
      )
  }

  list() {
    let userId = (<any>window).user._id;
    this.inventarioService.listInventaries()
      .subscribe(data => {
        this.inventaries = data;
        console.log('Início da funcionalidade ', this.inventaries);
      });

    this.clienteService.listaClientes(userId)
      .subscribe(data => {
        this.clients = data;
      });

    this.employeeService.listEmployees(userId)
      .subscribe(data => {
        this.employees = data;
      });

    this.collectorService.listar()
      .subscribe(data => {
        this.collectors = data;
      });
  }


  public selectInventary(idInventary) {
    if (this.inventarySelected === idInventary._id) {
      this.inventarySelected = null;
    } else {
      this.inventarySelected = idInventary._id;
      console.log('Início da funcionalidade 1 ', this.inventarySelected);
      this.inventarioService.listInventary(this.inventarySelected)
      .subscribe(data => {
        this.inventaryRequest = data;
        console.log('Início da funcionalidade 2 ', this.inventaryRequest);
      });
    }

    
  }

  public getFileName(): string {
    const fileName = this.files ? this.files[0].name : 'Selecione o arquivo de conferência';
    return fileName;
  }

  public setFileName(files: FileList): void {
     this.selectedFile = files[0];
     const fileReader = new FileReader();
     fileReader.readAsText(this.selectedFile, "UTF-8");
     fileReader.onload = () => {
         let lstDadosEmpresa = JSON.parse(JSON.stringify(fileReader.result));
         let cells = lstDadosEmpresa.split('\n').map(function (el) {
               return el.split(/\s+/);
          });
         let headings = cells.shift();
         console.log("headings ", JSON.parse(JSON.stringify(headings)));
         let out = cells.map(function (el) {
         let obj = {};
          for (var i = 0, l = el.length; i < l; i++) {
              if (headings[i] != ""){
                  obj[headings[i]] = isNaN(Number(el[i])) ? el[i] : + el[i];
              }
           }
          return obj;
          });
          this.inventaryRequest.clientFile = JSON.parse(JSON.stringify(out, null, 2));
          this.inventaryRequest.headFile = JSON.stringify(headings);
          console.log("JSON ", JSON.stringify(out, null, 2));
     }
      fileReader.onerror = (error) => {
      console.log(error);
    }

  }


  public addEmployeColector() {
    if (this.employeSelect && this.collectorSelect) {
      if (this.employeColectors.some(element => element.employe._id == this.employeSelect._id)) {
        this.toastr.info('Funcionário já incluos para este inventário', 'Atenção: ');
      } else if (this.employeColectors.some(element => element.collector._id == this.collectorSelect._id)) {
        this.toastr.info('Funcionário já incluos para este inventário', 'Atenção: ');
      } else {
        this.employeColectors.push({ employe: this.employeSelect, collector: this.collectorSelect });
      }
    } else {
      this.toastr.info('Selecione o Funcionário e o Dispositivo que queira incluir no inventário', 'Atenção: ');
    }
  }


  public removeEmployeColector(i) {
    this.employeColectors.splice(i, 1);
  }

  public saveInventary() {

   this.inventaryRequest.collectors = this.employeColectors.map(element => { 
       return { 
        'userId': element.employe._id, 
        'collectorId': element.collector._id 
      } 
    });

    this.inventarioService.update(this.inventaryRequest,this.inventarySelected)
      .subscribe(data => {
        this.inventaryRequest = data;
        console.log('Retorno da atualização do dados ',this.inventaryRequest);
      });
  }

}