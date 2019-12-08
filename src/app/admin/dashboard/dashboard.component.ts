import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../resources/services/admin/cliente.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  clientes: number;

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.listar();
  }

  listar(){
    let enterprise = (<any>window).user._id;
    this.clienteService.listaClientes(enterprise)
    .subscribe(data => {
       this.clientes = data.length;
    });
  }
}