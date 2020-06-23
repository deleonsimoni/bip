
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../resources/services/admin/cliente.service';
import { ConfirmDialogService } from '../../../resources/modal/confirm/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { CollectorService } from '../../../resources/services/admin/collector.service';

@Component({
  selector: 'app-listar-collector',
  templateUrl: './listar-collector.component.html',
  styleUrls: ['./listar-collector.component.scss']
})
export class ListarCollectorComponent implements OnInit {

  collectors: [any];

  constructor(private collectorService: CollectorService,
    private modalConfirm: ConfirmDialogService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.listar();
  }

  deletar(idCollector) {
    this.modalConfirm.confirm('Deletar', 'Confirma a deleção?')
      .then((ok: any) => {
        if (ok){
          this.collectorService.deletar(idCollector)
            .subscribe(data => {
              this.listar();
              this.toastr.success('Coletor deletado com sucesso');
            }, err => {
              this.toastr.error('' + err, 'Erro: ');
            })
          }
        }
      )
  }


  listar() {
    this.collectorService.listar()
      .subscribe(data => {
        this.collectors = data;
      });
  }

  generateSerial() {
    this.modalConfirm.confirm('Gerar Chave', 'Nesta opção será criada uma chave para ser inserida no disposivito de coleta. Deseja gerar chave?')
      .then((ok) => {
        if (ok){
          this.collectorService.register(null)
            .subscribe(data => {
              this.listar();
              this.toastr.success('Chave gerada com sucesso');
            }, err => {
              this.toastr.error('' + err, 'Erro: ');
            })
         }
        }
      )
  }
}