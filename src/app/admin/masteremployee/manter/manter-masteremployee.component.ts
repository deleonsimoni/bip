import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../resources/services/admin/cliente.service';
import { ConfirmDialogService } from '../../../resources/modal/confirm/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { MasterEmployeeService } from '../../../resources/services/admin/masteremployee.service';

@Component({
  selector: 'app-manter-masteremployee',
  templateUrl: './manter-masteremployee.component.html',
  styleUrls: ['./manter-masteremployee.component.scss']
})
export class ManterMasterEmployeeComponent implements OnInit {

  clientes: [any];
  gruposSelecionados: [any];

  constructor(private clienteService: ClienteService, private masterEmployeeService: MasterEmployeeService,
    private modalConfirm: ConfirmDialogService, private toastr: ToastrService) { }

  ngOnInit() {
    this.listMasterEmployeeRegister();
  }

  deletarMasterEmployee(idMasterEmployee) {
    this.modalConfirm.confirm('Deletar', 'Confirma a deleção?')
      .then(() =>
        this.masterEmployeeService.deleteMasterEmployee(idMasterEmployee)
          .subscribe(data => {
            this.listMasterEmployeeRegister();
            this.toastr.success('Relacionamento de dono e do funcionário excluído com sucesso.');
          }, err => {
            this.toastr.error('Problema na exclusão do relacionamento de dono e do funcionário. ' + err.keyValue.msg, 'Erro: ');
          })
      );
  }

  listMasterEmployeeRegister() {
    console.log('entrada no metodo listMasterEmployeeRegister ');
    let enterprise = (<any>window).user._id;
    this.masterEmployeeService.listMasterEmployee(enterprise)
      .subscribe(data => {
        console.log('informações dos dados ', data);
        this.gruposSelecionados = data;
        console.log('informações de todos os empregados ', this.gruposSelecionados);
      }, err => {
        this.toastr.error('Problema ao consultar o funcionário. ' + err.error.msg, 'Erro: ');
      });
  }
}