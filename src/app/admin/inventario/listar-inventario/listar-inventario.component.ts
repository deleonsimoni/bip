import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../../resources/services/admin/inventario.service';
import { ConfirmDialogService } from '../../../resources/modal/confirm/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth/auth.service';
import { ClienteService } from '../../../resources/services/admin/cliente.service';
import { EmployeeService } from '../../../resources/services/admin/employee.service';
import { CollectorService } from '../../../resources/services/admin/collector.service';

@Component({
  selector: 'app-listar-inventario',
  templateUrl: './listar-inventario.component.html',
  styleUrls: ['./listar-inventario.component.scss']
})
export class ListarInventarioComponent implements OnInit {

  public inventaries = [];
  public inventarySelected;
  public clients = [];
  public employees = [];
  public collectors = [];
  public employeColectors = [];
  private files: FileList;
  public inventary: any;

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


  public selectInventary(inventary) {
    if (this.inventarySelected === inventary._id) {
      this.inventarySelected = null;
    } else {
      this.inventarySelected = inventary._id;
    }
  }

  public getFileName(): string {
    const fileName = this.files ? this.files[0].name : 'Selecione o arquivo de conferência';
    return fileName;
  }

  public setFileName(files: FileList): void {
    this.files = files;
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
    this.inventary.collectors = this.employeColectors.map(element => { return { 'userId': element.employe._id, 'collectorId': element.collector._id } });
    this.inventarioService.register(this.inventary)
      .subscribe(data => {
        this.inventaries = data;
      });
  }

}