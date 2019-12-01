import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/admin/cliente.service';

@Component({
  selector: 'app-manter',
  templateUrl: './manter.component.html',
  styleUrls: ['./manter.component.scss']
})
export class ManterComponent implements OnInit {

  clientes: [any];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.listar();
  }

  listar(){
    this.clienteService.listaClientes()
    .subscribe(data => {
       this.clientes = data;
    });
  }
}