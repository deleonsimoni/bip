import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../../resources/services/admin/inventario.service';
import { ConfirmDialogService } from '../../../resources/modal/confirm/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-listar-inventario',
  templateUrl: './listar-inventario.component.html',
  styleUrls: ['./listar-inventario.component.scss']
})
export class ListarInventarioComponent implements OnInit {

  public inventaries = [];
  public inventarySelected;
  public clients = [];

  constructor(private inventarioService: InventarioService,
    private authService: AuthService,
    private modalConfirm: ConfirmDialogService,
    private toastr: ToastrService
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
    this.inventarioService.listInventaries(userId)
      .subscribe(data => {
        this.inventaries = data;
      });
  }


  public selectInventary(inventary) {
    if (this.inventarySelected === inventary._id) {
      this.inventarySelected = null;
    } else {
      this.inventarySelected = inventary._id;
    }
  }



}