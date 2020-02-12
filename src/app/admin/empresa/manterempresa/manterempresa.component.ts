import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../../resources/services/admin/empresa.service';
import { ConfirmDialogService } from '../../../resources/modal/confirm/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manterempresa',
  templateUrl: './manterempresa.component.html',
  styleUrls: ['./manterempresa.component.scss']
})
//
export class ManterempresaComponent implements OnInit {
  empresas: [any];

  constructor(private empresaService: EmpresaService, private modalConfirm: ConfirmDialogService, private toastr: ToastrService) { }

  ngOnInit() {
    this.listar();
  }

  deletarEmpresa(idEmpresa) {
    this.modalConfirm.confirm('Deletar', 'Confirma a deleção?')
      .then(() =>
        this.empresaService.deletarEmpresa(idEmpresa)
          .subscribe(data => {
            this.listar();
            this.toastr.success('Empresa excluída com sucesso');
          }, err => {
            this.toastr.error('Problema ao excluir a empresa. ' + err, 'Erro: ');
          })
      )
  }

  listar() {

    let enterprise = (<any>window).user._id;
    this.empresaService.listaEmpresas(enterprise)
      .subscribe(data => {
        this.empresas = data;
      }, err => {
        this.toastr.error('Problema ao consultar a empresa. ' + err.error.msg, 'Erro: ');
      });
  }

}

