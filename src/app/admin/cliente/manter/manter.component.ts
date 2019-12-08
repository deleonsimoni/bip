import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../resources/services/admin/cliente.service';
import { ConfirmDialogService } from '../../../resources/modal/confirm/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manter',
  templateUrl: './manter.component.html',
  styleUrls: ['./manter.component.scss']
})
export class ManterComponent implements OnInit {

  clientes: [any];

  constructor(private clienteService: ClienteService, private modalConfirm: ConfirmDialogService, private toastr: ToastrService) { }

  ngOnInit() {
    this.listar();
  }

  deletarCliente(idCliente) {
    this.modalConfirm.confirm('Deletar', 'Confirma a deleção?')
    .then(() => 
      this.clienteService.deletarCliente(idCliente)
      .subscribe(data => {
        this.listar();
        this.toastr.success('Cliente deletado com sucesso');
      }, err => {
          this.toastr.error(''  + err, 'Erro: ');
      })
    )
  }

  listar(){
    let enterprise = (<any>window).user._id;
    this.clienteService.listaClientes(enterprise)
    .subscribe(data => {
       this.clientes = data;
    });
  }
}